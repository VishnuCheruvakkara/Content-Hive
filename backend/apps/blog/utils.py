import cloudinary.uploader

def upload_to_cloudinary(file, folder="content_hive_blog_data"):
    result = cloudinary.uploader.upload(
        file,
        folder=folder,
        resource_type="auto"
    )
    return result["secure_url"]
