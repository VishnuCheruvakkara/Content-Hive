from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from .utils import upload_to_cloudinary
from .serializers import DocumentUploadSerializer,ImageUploadSerializer
from cloudinary.exceptions import Error as CloudinaryError

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
                url = upload_to_cloudinary(file, folder="content_hive_blog_document")
                return Response(
                    {"status": "success", "message": "Successfully uploaded data", "data": url},
                    status=status.HTTP_201_CREATED
                )
            except CloudinaryError as e:
                return Response(
                    {"status": "error", "message": "Cloudinary upload failed"},
                    status=status.HTTP_502_BAD_GATEWAY
                )
            except Exception as e:
                return Response(
                    {"status": "error", "message": "Unexpected error occurred"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CreateBlog(APIView):
    pass 


