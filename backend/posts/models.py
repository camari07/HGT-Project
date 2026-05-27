from django.db import models
from django.contrib.auth.models import User

    
class Irrigation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    field_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, default="Unknown")
    farm_size = models.FloatField(default=0.0)
    crop_type = models.CharField(max_length=255, default="Unknown")
    plant_growth_stage = models.CharField(max_length=255, default="Unknown")
    irrigation_method = models.CharField(max_length=255, default="Unknown")
    irrigation_duration = models.FloatField(default=0.0) 
    water_amount = models.FloatField()
    water_source = models.CharField(max_length=255, default="Unknown")
    filter_type = models.CharField(max_length=255, default="None")
    soil_type = models.CharField(max_length=255, default="Unknown")
    weather_conditions = models.CharField(max_length=255, default="Unknown")
    leakage = models.BooleanField(default=False)
    pump_used = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.field_name} - {self.water_amount}L at {self.timestamp}"
    

class Farm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=255, default="Unknown")
    farm_size = models.FloatField(default=0.0)
    crop = models.CharField(max_length=255, default="Unknown")
    plant_growth_stage = models.CharField(max_length=255, default="Unknown")
    activity_type = models.CharField(max_length=255)
    condition_of_irrigation_system = models.CharField(max_length=255, default="Unknown")
    irrigating = models.BooleanField(default=False)
    fertilizer_used = models.CharField(max_length=255, default="None")
    crop_condition = models.CharField(max_length=255, default="Unknown")
    pest_observations = models.CharField(max_length=255, default="None")
    pest_control_measures = models.CharField(max_length=255, default="None")
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.activity_type} - {self.description} at {self.timestamp}"
    
class Maintenance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    equipment_name = models.CharField(max_length=255)
    maintenance_type = models.CharField(max_length=255)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.equipment_name} - {self.maintenance_type} at {self.timestamp}"
    
class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    problem_type = models.CharField(max_length=255)
    description = models.TextField()
    contact_info = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} at {self.timestamp}"