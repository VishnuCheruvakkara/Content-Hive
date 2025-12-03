from django.urls import path
from .views import CreateBlog

urlpatterns = [
    path("create-blog/", CreateBlog.as_view(), name="create-blog"),
    
]
