from rest_framework import serializers
import os

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