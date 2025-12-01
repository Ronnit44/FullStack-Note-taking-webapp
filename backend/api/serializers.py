from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True, max_length=30)
    last_name = serializers.CharField(required=False, allow_blank=True, max_length=30)
    
    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for getting current user profile info"""
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "date_joined"]


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            "id", 
            "title", 
            "content", 
            "created_at", 
            "updated_at",
            "author", 
            "is_pinned", 
            "color"
        ]
        extra_kwargs = {"author": {"read_only": True}}