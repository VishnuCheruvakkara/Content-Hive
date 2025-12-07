from django.urls import path
from .views import CreateBlog,DocumentUpload,ImageUpload,GetUsersBlogs,GetSingleBlog

urlpatterns = [
    path("create-blog/", CreateBlog.as_view(), name="create-blog"),

    path("upload-image/", ImageUpload.as_view(), name="upload-image"),
    path("upload-file/", DocumentUpload.as_view(), name="upload-file"),

    path('create-blog/', CreateBlog.as_view(), name='create-blog'),
    path('get-users-blog/', GetUsersBlogs.as_view(), name='get-users-blog'),
    path('get-single-blog/<int:blog_id>/', GetSingleBlog.as_view(), name='get-single-blog'),
]
