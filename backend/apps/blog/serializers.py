from rest_framework import serializers
import os
from rest_framework import serializers
from blog.models import Blog
from django.contrib.auth import get_user_model 
from .validators import validate_title, validate_description, validate_content

User=get_user_model()

class ImageUploadSerializer(serializers.Serializer):
    file = serializers.ImageField()

    MAX_SIZE_MB = 5 

    def validate_file(self, file):
        # Validate MIME type
        allowed_types = ["image/jpeg", "image/png", "image/webp"]
        if file.content_type not in allowed_types:
            raise serializers.ValidationError("Allowed image formats: JPG, PNG, WEBP.")

        # Validate extension
        allowed_ext = [".jpg", ".jpeg", ".png", ".webp"]
        ext = os.path.splitext(file.name)[1].lower()
        if ext not in allowed_ext:
            raise serializers.ValidationError("Invalid image file extension.")

        # Validate size
        max_bytes = self.MAX_SIZE_MB * 1024 * 1024
        if file.size > max_bytes:
            raise serializers.ValidationError(f"File too large. Max size: {self.MAX_SIZE_MB}MB")

        # Sanitize filename
        file.name = file.name.replace(" ", "_")

        return file



class DocumentUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

    MAX_SIZE_MB = 10  

    def validate_file(self, file):
        # Allowed MIME types
        allowed_types = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  # .docx
            "application/msword",  # .doc
        ]

        if file.content_type not in allowed_types:
            raise serializers.ValidationError(
                "Allowed formats: PDF, DOC, DOCX."
            )

        # Allowed extensions
        allowed_ext = [".pdf", ".doc", ".docx"]
        ext = os.path.splitext(file.name)[1].lower()

        if ext not in allowed_ext:
            raise serializers.ValidationError("Invalid document extension.")

        # Size validation
        max_bytes = self.MAX_SIZE_MB * 1024 * 1024
        if file.size > max_bytes:
            raise serializers.ValidationError(f"File too large. Max size: {self.MAX_SIZE_MB}MB")

        # Sanitize filename
        file.name = file.name.replace(" ", "_")

        return file
    
class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
        read_only_fields = fields


class BlogSerializer(serializers.ModelSerializer):
    created_by = UserMiniSerializer(read_only=True)

    # Add validation by referencing validators
    title = serializers.CharField(validators=[validate_title])
    description = serializers.CharField(validators=[validate_description])
    content_html = serializers.CharField(validators=[validate_content])

    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'description',
            'content_html',
            'created_at',
            'updated_at',
            'is_published',
            'created_by',
        ]
        read_only_fields = ["id", "created_by", "created_at", "updated_at"]