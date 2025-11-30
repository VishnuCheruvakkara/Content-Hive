from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth import get_user_model
from .serializers import SignUpSerializer
from .utils import generate_tokens_for_user,set_refresh_token_cookie

User = get_user_model()

# Create your views here.


class SignUp(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                user=User.objects.create_user(
                    username=serializer.validated_data['username'],
                    email=serializer.validated_data['email'],
                    password=serializer.validated_data['password'],
                )

                tokens = generate_tokens_for_user(user)

                response= Response({
                    "status":"success",
                    "message":"User created successfully!",
                    "data":{
                        "id":user.id,
                        "username":user.username,
                        "email":user.email,
                        "access":tokens["access"],
                    }
                },status=status.HTTP_201_CREATED)
            
                set_refresh_token_cookie(response,tokens["refresh"])

                return response 
            
            except Exception as e:
                return Response({
                    "status": "error",
                    "message": "Something went wrong while creating the user.",
                    "errors": str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "status": "error",
            "message": "Validation failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
