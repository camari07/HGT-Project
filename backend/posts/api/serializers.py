from rest_framework.serializers import ModelSerializer
from ..models import Irrigation, Farm, Maintenance
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id","first_name", "last_name", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}
    def create(self, validated_data):
        user = User.objects.create(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            username=validated_data["username"],
            email=validated_data["email"],
            password=make_password(validated_data["password"]),
        )
        return user

class IrrigationSerializer(ModelSerializer):
    class Meta:
        model = Irrigation
        fields = ["id","user", "field_name","location", "farm_size", "crop_type", "plant_growth_stage", "irrigation_method", "irrigation_duration", "water_amount", "water_source", "pump_used","filter_type", "leakage", "timestamp"]
        extra_kwargs = {"user": {"read_only": True}}

class FarmSerializer(ModelSerializer):
    class Meta:
        model = Farm
        fields = ["id","user", "activity_type","crop","location", "farm_size", "crop_type", "plant_growth_stage", "condition_of_irrigation_system", "irrigating", "description", "fertilizer_used", "crop_condition", "pest_observations", "pest_control_measures", "timestamp"]
        extra_kwargs = {"user": {"read_only": True}}

class MaintenanceSerializer(ModelSerializer):
    class Meta:
        model = Maintenance
        fields = ["id","user", "equipment_name", "maintenance_type", "description", "timestamp"]
        extra_kwargs = {"user": {"read_only": True}}