from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth import get_user_model
from .serializers import SignUpSerializer, LoginSerializer
from .utils import (
    generate_tokens_for_user,
    set_refresh_token_cookie,
    remove_refresh_token_cookie,
)
from django.contrib.auth import authenticate

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
        remove_refresh_token_cookie(request,response)
        return response
