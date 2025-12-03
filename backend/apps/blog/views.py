from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken


class CreateBlog(APIView):
    pass 