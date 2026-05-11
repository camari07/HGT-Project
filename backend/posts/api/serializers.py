from rest_framework.serializers import ModelSerializer
from ..models import Irrigation, Farm
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
            password=make_password(validated_data["password"]),
        )
        return user

class IrrigationSerializer(ModelSerializer):
    class Meta:
        model = Irrigation
        fields = ["id","user", "field_name", "water_amount", "timestamp"]
        extra_kwargs = {"user": {"read_only": True}}

class FarmSerializer(ModelSerializer):
    class Meta:
        model = Farm
        fields = ["id","user", "activity_type", "irrigating", "description", "timestamp"]
        extra_kwargs = {"user": {"read_only": True}}