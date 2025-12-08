from django.urls import path
from .views import CreateBlog,DocumentUpload,ImageUpload,GetUsersBlogs,GetSingleBlog,UpdateBlog,DeleteBlog,ExploreBlogs
urlpatterns = [
    path("create-blog/", CreateBlog.as_view(), name="create-blog"),

    path("upload-image/", ImageUpload.as_view(), name="upload-image"),
    path("upload-file/", DocumentUpload.as_view(), name="upload-file"),

    path("create-blog/", CreateBlog.as_view(), name="create-blog"),
    path("get-users-blog/", GetUsersBlogs.as_view(), name="get-users-blog"),
    path("get-single-blog/<int:blog_id>/", GetSingleBlog.as_view(), name="get-single-blog"),
    path("update-blog/<int:id>/", UpdateBlog.as_view(), name="update-blog"),
    path("delete-blog/<int:id>/", DeleteBlog.as_view(), name="delete-blog"),
    path("explore-blogs/", ExploreBlogs.as_view(), name="explore-blogs"),


]
