import cloudinary.uploader
import uuid
from django.conf import settings
from supabase import create_client


# For Image upload
def upload_to_cloudinary(file, folder="content_hive_blog_data"):
    result = cloudinary.uploader.upload(
        file,
        folder=folder,
        resource_type="raw"
    )
    return result["secure_url"]


# For file attachments upload
supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

def upload_to_supabase(file, folder="documents"):

    # generate unique file name
    extension = file.name.split(".")[-1]
    file_name = f"{folder}/{uuid.uuid4()}.{extension}"

    # Perform upload
    res = supabase.storage.from_(settings.SUPABASE_BUCKET).upload(
        file_name,
        file.read(),
        file_options={"content-type": file.content_type}
    )

    # If upload failed
    if not res or not getattr(res, "path", None):
        raise Exception("Upload failed. No path returned from Supabase.")

    # Return public URL
    public_url = supabase.storage.from_(settings.SUPABASE_BUCKET).get_public_url(file_name)
    return public_url