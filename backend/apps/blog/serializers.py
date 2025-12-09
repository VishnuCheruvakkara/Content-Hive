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


class BlogDetailSerializer(serializers.ModelSerializer):
    created_by = UserMiniSerializer(read_only=True)

    likes_count = serializers.SerializerMethodField()
    is_liked_by_user = serializers.SerializerMethodField()
    is_disliked_by_user = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = [
            "id",
            "title",
            "description",
            "content_html",
            "created_at",
            "updated_at",
            "is_published",
            "created_by",
            "likes_count",
            "is_liked_by_user",
            "is_disliked_by_user",
            "comments",
            "comments_count",
        ]

    def get_likes_count(self, obj):
        return obj.likes.filter(reaction="like").count()

    def get_is_liked_by_user(self, obj):
        request = self.context.get("request")
        user = request.user

        if user.is_anonymous:
            return False

        return obj.likes.filter(user=user, reaction="like").exists()

    def get_is_disliked_by_user(self, obj):
        request = self.context.get("request")
        user = request.user

        if user.is_anonymous:
            return False

        return obj.likes.filter(user=user, reaction="dislike").exists()

    def get_comments(self, obj):
        comments = obj.comments.filter(is_approved=True).order_by("-created_at")

        return [
            {
                "id": c.id,
                "user": c.user.username,
                "user_id": c.user.id,
                "text": c.text,
                "created_at": c.created_at,
            }
            for c in comments
        ]

    def get_comments_count(self, obj):
        return obj.comments.filter(is_approved=True).count()
