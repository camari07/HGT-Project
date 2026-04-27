from rest_framework.serializers import ModelSerializer
from backend.posts.models import Token
from backend.posts.models import User

class TokenSerializer(ModelSerializer):
    class Meta:
        model = Token
        fields = ["id", "token", "created_at", "expires_at", "user_id", "is_used"]

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]