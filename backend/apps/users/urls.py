from django.urls import path, include
from .views import SignUp

urlpatterns = [
    path("sign-up/", SignUp.as_view(), name="sign-up"),
]
