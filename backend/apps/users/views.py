from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth import get_user_model
from .serializers import SignUpSerializer, LoginSerializer, UserSerializer
from .utils import (
    generate_tokens_for_user,
    set_refresh_token_cookie,
    remove_refresh_token_cookie,
)
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from django.db import DatabaseError
from django.shortcuts import get_object_or_404
from blog.models import Blog, Comment, Like

User = get_user_model()


class SignUp(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user = User.objects.create_user(
                    username=serializer.validated_data["username"],
                    email=serializer.validated_data["email"],
                    password=serializer.validated_data["password"],
                )

                tokens = generate_tokens_for_user(user)

                response = Response(
                    {
                        "status": "success",
                        "message": "User created successfully!",
                        "data": {
                            "id": user.id,
                            "username": user.username,
                            "email": user.email,
                            "access": tokens["access"],
                            "is_admin": user.is_staff,
                        },
                    },
                    status=status.HTTP_201_CREATED,
                )

                set_refresh_token_cookie(response, tokens["refresh"])

                return response

            except Exception as e:
                return Response(
                    {
                        "status": "error",
                        "message": "Something went wrong while creating the user.",
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        return Response(
            {
                "status": "error",
                "message": "Validation failed",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class SignIn(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            user = authenticate(request, email=email, password=password)

            if user is None:
                return Response(
                    {"status": "error", "message": "Invalid email or password"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            tokens = generate_tokens_for_user(user)

            response = Response(
                {
                    "status": "success",
                    "message": "Login successful",
                    "data": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "access": tokens["access"],
                        "is_admin": user.is_staff,
                    },
                },
                status=status.HTTP_200_OK,
            )

            set_refresh_token_cookie(response, tokens["refresh"])

            return response

        return Response(
            {
                "status": "error",
                "message": "Validation failed",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class Logout(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        response = Response(
            {"status": "success", "message": "Logged out"}, status=status.HTTP_200_OK
        )
        remove_refresh_token_cookie(request, response)
        return response


class CustomTokenRefresh(TokenRefreshView):

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])

        if refresh_token is None:
            return Response(
                {"status": "error", "message": "Refresh token missing", "data": None},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            # Call the  Inherited class ( Adding refresh token in request )

            request.data["refresh"] = refresh_token
            response = super().post(request, *args, **kwargs)

            new_access = response.data.get("access")
            new_refresh = response.data.get("refresh")

            if not new_access:
                raise InvalidToken("Token refresh failed")

            token_obj = RefreshToken(new_refresh)
            user_id = token_obj["user_id"]
            user = User.objects.get(id=user_id)

            res = Response(
                {
                    "status": "success",
                    "message": "Token refreshed",
                    "data": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "access": new_access,
                        "is_admin": user.is_staff,
                    },
                },
                status=status.HTTP_200_OK,
            )

            set_refresh_token_cookie(res, new_refresh)
            return res

        except InvalidToken:
            return Response(
                {"status": "error", "message": "Invalid refresh token"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


# Check user is authenticated or not
class GetUserData(APIView):

    def get(self, request):

        return Response(
            {
                "status": "success",
            },
            status=status.HTTP_200_OK,
        )


# Generate csrf before app start
@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({"message": "CSRF cookie set"})


class AdminSignIn(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            user = authenticate(request, email=email, password=password)

            if user is None or not user.is_staff:
                return Response(
                    {"status": "error", "message": "Invalid admin credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            tokens = generate_tokens_for_user(user)

            response = Response(
                {
                    "status": "success",
                    "message": "Admin login successful",
                    "data": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "access": tokens["access"],
                        "is_admin": True,
                    },
                },
                status=status.HTTP_200_OK,
            )

            set_refresh_token_cookie(response, tokens["refresh"])
            return response

        return Response(
            {"status": "error", "message": "Validation failed"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class AdminUsersList(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        try:
            search = request.query_params.get("q", "")

            users = User.objects.filter(is_staff=False)

            if search:
                users = users.filter(
                    Q(username__icontains=search) | Q(email__icontains=search)
                )

            paginator = PageNumberPagination()
            paginator.page_size = 5
            result_page = paginator.paginate_queryset(users, request)

            serializer = UserSerializer(result_page, many=True)

            return paginator.get_paginated_response(serializer.data)

        except DatabaseError:
            return Response(
                {
                    "success": False,
                    "message": "Database error occurred while fetching users.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": "Something went wrong while fetching users.",
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ToggleUserStatus(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, user_id):
        try:
            action = request.data.get("action")

            if action not in ["activate", "deactivate"]:
                return Response(
                    {"success": False, "message": "Invalid action"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if request.user.id == user_id:
                return Response(
                    {
                        "success": False,
                        "message": "Admin cannot deactivate themselves.",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = get_object_or_404(User, id=user_id)

            # Update active status
            user.is_active = action == "activate"
            user.save()

            return Response(
                {
                    "success": True,
                    "message": f"User {action}d successfully",
                    "is_active": user.is_active,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": "Something went wrong",
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class AdminDashboardStats(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response(
            {
                "total_users": User.objects.filter(is_staff=False, is_superuser=False).count(),
                "total_posts": Blog.objects.filter(is_deleted=False).count(),
                "total_comments": Comment.objects.count(),
                "total_likes": Like.objects.filter(reaction="like").count(),
            }
        )
