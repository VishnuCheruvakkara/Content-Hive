from rest_framework import serializers
from django.contrib.auth import get_user_model
from .validators import validate_password,validate_username,validate_email

User = get_user_model()

class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, min_length=6, max_length=20, validators=[validate_password]
    )
    username= serializers.CharField(min_length=3,max_length=20,validators=[validate_username])
    email= serializers.EmailField(required=True,validators=[validate_email])

    class Meta:
        model = User
        fields = ["email", "username", "password"]
