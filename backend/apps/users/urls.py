from django.urls import path, include
from .views import SignUp, SignIn, Logout

urlpatterns = [
    path("sign-up/", SignUp.as_view(), name="sign-up"),
    path("login/", SignIn.as_view(), name="login"),
    path("logout/", Logout.as_view(), name="logout"),
]
