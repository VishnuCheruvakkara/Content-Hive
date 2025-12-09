from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from .utils import upload_to_cloudinary,upload_to_supabase
from .serializers import DocumentUploadSerializer,ImageUploadSerializer,BlogSerializer,BlogDetailSerializer
from cloudinary.exceptions import Error as CloudinaryError
from blog.models import Blog
from django.db import DatabaseError
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from blog.models import Blog,Like
class ImageUpload(APIView):
    def post(self, request):
        serializer = ImageUploadSerializer(data=request.data)

        if serializer.is_valid():
            file = serializer.validated_data["file"]

            try:
                url = upload_to_cloudinary(file, folder="content_hive_blog_images")
                return Response(
                    {"status": "success", "message": "Image uploaded successfully", "data": url},
                    status=status.HTTP_201_CREATED
                )
            except CloudinaryError as e:
                return Response(
                    {"status": "error", "message": "Cloudinary upload failed"},
                    status=status.HTTP_502_BAD_GATEWAY
                )
            except Exception as e:
                # Unknown exception
                return Response(
                    {"status": "error", "message": "Unexpected error occurred"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DocumentUpload(APIView):
    def post(self, request):
        serializer = DocumentUploadSerializer(data=request.data)

        if serializer.is_valid():
            file = serializer.validated_data["file"]

            try:
                url = upload_to_supabase(file, folder="content_hive_blog_document")
                return Response(
                    {"status": "success", "message": "Successfully uploaded document", "data": url},
                    status=status.HTTP_201_CREATED
                )

            except Exception as e:
                return Response(
                    {"status": "error", "message": "Supabase upload failed", "details": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateBlog(APIView):

    def post(self, request):
        try:
            serializer = BlogSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(created_by=request.user)
                return Response(
                    {
                        "message": "Blog created successfully",
                        "data": serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )

            return Response(
                {
                    "status": "error",
                    "message": "Validation failed",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {
                    "error": "Something went wrong while creating the blog.",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetUsersBlogs(APIView):

    def get(self, request):
        try:
            user = request.user
            search = request.query_params.get("q", "")
            blogs = Blog.objects.filter(created_by=user,is_deleted=False).order_by("-created_at")

            if search:
                blogs = blogs.filter(title__icontains=search)

            paginator = PageNumberPagination()
            paginator.page_size = 5
            result_page = paginator.paginate_queryset(blogs, request)
            serializer = BlogSerializer(result_page, many=True,context={"request":request})

            return paginator.get_paginated_response(serializer.data)

        except DatabaseError:
            return Response({
                "success": False,
                "message": "Database error occurred while fetching blogs."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({
                "success": False,
                "message": "Something went wrong while fetching user blogs.",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetSingleBlog(APIView):
    """
    Fetch full details of a single blog by ID.
    """

    def get(self, request, blog_id):
        try:
            blog = get_object_or_404(Blog, id=blog_id, is_deleted=False )

            # If blog is not published, only owner can view
            if not blog.is_published and blog.created_by != request.user:
                return Response(
                    {
                        "success": False,
                        "message": "You do not have permission to view this blog."
                    },
                    status=status.HTTP_403_FORBIDDEN
                )

            serializer = BlogDetailSerializer(blog, context={"request":request})
            return Response(
                {
                    "success": True,
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )

        except DatabaseError:
            return Response(
                {
                    "success": False,
                    "message": "Database error while fetching the blog."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": "Something went wrong.",
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UpdateBlog(APIView):

    def patch(self, request, id):
        try:
            try:
                blog = Blog.objects.get(id=id, created_by=request.user)
            except Blog.DoesNotExist:
                return Response(
                    {"error": "Blog not found or unauthorized"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = BlogSerializer(blog, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Blog updated successfully",
                        "data": serializer.data
                    },
                    status=status.HTTP_200_OK
                )

            return Response(
                {
                    "status": "error",
                    "message": "Validation failed",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {
                    "error": "Something went wrong while updating the blog.",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class DeleteBlog(APIView):

    def patch(self, request, id):
        try:
            try:
                blog = Blog.objects.get(id=id, created_by=request.user, is_deleted=False)
            except Blog.DoesNotExist:
                return Response(
                    {"error": "Blog not found or unauthorized"},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Soft delete
            blog.is_deleted = True
            blog.save()

            return Response(
                {"message": "Blog deleted successfully"},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {
                    "error": "Something went wrong while deleting the blog.",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ExploreBlogs(APIView):

    def get(self, request):
        try:
            search = request.query_params.get("q", "")
            
            blogs = Blog.objects.filter(
                is_deleted=False,
                is_published=True
            ).order_by("-created_at")

            if search:
                blogs = blogs.filter(title__icontains=search)

            paginator = PageNumberPagination()
            paginator.page_size = 5
            result_page = paginator.paginate_queryset(blogs, request)
            serializer = BlogSerializer(result_page, many=True,context={"request":request})

            return paginator.get_paginated_response(serializer.data)

        except DatabaseError:
            return Response({
                "success": False,
                "message": "Database error occurred while fetching blogs."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({
                "success": False,
                "message": "Something went wrong while fetching blogs.",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ToggleLike(APIView):

    def post(self, request, blog_id):
        try:
            blog = get_object_or_404(Blog, id=blog_id, is_deleted=False)

            user = request.user
            if user.is_anonymous:
                return Response(
                    {"success": False, "message": "Authentication required."},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            like_obj, created = Like.objects.get_or_create(
                blog=blog,
                user=user,
                defaults={"reaction": Like.LIKE}
            )

            if not created and like_obj.reaction == Like.LIKE:
                like_obj.reaction = Like.NONE
                like_obj.save()
                is_liked = False

            else:
                like_obj.reaction = Like.LIKE
                like_obj.save()
                is_liked = True

            likes_count = blog.likes.filter(reaction=Like.LIKE).count()

            return Response(
                {
                    "success": True,
                    "is_liked": is_liked,
                    "likes_count": likes_count,
                },
                status=status.HTTP_200_OK,
            )

        except DatabaseError:
            return Response(
                {
                    "success": False,
                    "message": "Database error while updating like."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": "Something went wrong.",
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ToggleDislike(APIView):

    def post(self, request, blog_id):
        try:
            blog = get_object_or_404(Blog, id=blog_id, is_deleted=False)
            user = request.user

            if user.is_anonymous:
                return Response(
                    {"success": False, "message": "Authentication required."},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Get or create the reaction object
            dislike_obj, created = Like.objects.get_or_create(
                blog=blog,
                user=user,
                defaults={"reaction": Like.DISLIKE}
            )

            if not created and dislike_obj.reaction == Like.DISLIKE:
                dislike_obj.reaction = Like.NONE
                dislike_obj.save()
                is_disliked = False

            else:
                
                dislike_obj.reaction = Like.DISLIKE
                dislike_obj.save()
                is_disliked = True

                Like.objects.filter(
                    blog=blog,
                    user=user,
                    reaction=Like.LIKE
                ).update(reaction=Like.NONE)

            likes_count = blog.likes.filter(reaction=Like.LIKE).count()

            return Response(
                {
                    "success": True,
                    "is_disliked": is_disliked,
                    "likes_count": likes_count,
                },
                status=status.HTTP_200_OK,
            )

        except DatabaseError:
            return Response(
                {
                    "success": False,
                    "message": "Database error while updating dislike."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": "Something went wrong.",
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
