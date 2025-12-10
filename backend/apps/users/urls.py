from django.urls import path
from .views import (
    SignUp,
    SignIn,
    Logout,
    CustomTokenRefresh,
    GetUserData,
    GetCSRFToken,
    AdminSignIn,
    AdminUsersList,
    ToggleUserStatus,
    AdminDashboardStats,
)

urlpatterns = [
    path("sign-up/", SignUp.as_view(), name="sign-up"),
    path("login/", SignIn.as_view(), name="login"),
    path("logout/", Logout.as_view(), name="logout"),
    path("token-refresh/", CustomTokenRefresh.as_view(), name="token-refresh"),
    path("get-user-data/", GetUserData.as_view(), name="get-user-data"),
    path("csrf/", GetCSRFToken.as_view(), name="get-csrf"),
    path("admin-login/", AdminSignIn.as_view(), name="admin-login"),
    path("users-list/", AdminUsersList.as_view(), name="admin-users-list"),
    path(
        "toggle-user-status/<int:user_id>/",
        ToggleUserStatus.as_view(),
        name="toggle-user-status",
    ),
    path(
        "admin-dashboard-stats/",
        AdminDashboardStats.as_view(),
        name="admin-dashboard-stats",
    ),
]
