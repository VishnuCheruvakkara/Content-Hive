from django.urls import path
from .views import CreateBlog,DocumentUpload,ImageUpload

urlpatterns = [
    path("create-blog/", CreateBlog.as_view(), name="create-blog"),

    path("upload-image/", ImageUpload.as_view(), name="upload-image"),
    path("upload-file/", DocumentUpload.as_view(), name="upload-file"),
    
]
