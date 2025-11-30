from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response 
from django.conf import settings 

def generate_tokens_for_user(user):
    refresh=RefreshToken.for_user(user)
    return{
        "access":str(refresh.access_token),
        "refresh":str(refresh)
    } 

def set_refresh_token_cookie(response,refresh_token):
    response.set_cookie(
        key=settings.SIMPLE_JWT["AUTH_COOKIE"],                # cookie name
        value=refresh_token,
        httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"], # JS cannot access
        secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],      # HTTPS only
        samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],  # cross-site requests
        max_age=int(settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds())
    )
