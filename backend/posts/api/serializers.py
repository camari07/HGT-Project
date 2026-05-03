from rest_framework.serializers import ModelSerializer
from ..models import Irrigation, Token
from ..models import User

class TokenSerializer(ModelSerializer):
    class Meta:
        model = Token
        fields = ["id", "token", "created_at", "expires_at", "user_id", "is_used"]

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]

class IrrigationSerializer(ModelSerializer):
    class Meta:
        model = Irrigation
        fields = ["id", "field_name", "water_amount", "timestamp"]