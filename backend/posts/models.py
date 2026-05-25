from django.db import models
from django.contrib.auth.models import User


    
class Irrigation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    field_name = models.CharField(max_length=255)
    water_amount = models.FloatField()
    water_source = models.CharField(max_length=255, default="Unknown")
    filter_type = models.CharField(max_length=255, default="None")
    leakage = models.BooleanField(default=False)
    pump_used = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.field_name} - {self.water_amount}L at {self.timestamp}"
    

class Farm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    crop = models.CharField(max_length=255, default="Unknown")
    activity_type = models.CharField(max_length=255)
    irrigating = models.BooleanField(default=False)
    fertilizer_used = models.CharField(max_length=255, default="None")
    crop_condition = models.CharField(max_length=255, default="Unknown")
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
    

import random
import string

class VerificationCode(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def generate_code(self):
        self.code = ''.join(random.choices(string.digits, k=6))
        self.save()

    def __str__(self):
        return f"{self.user.username} - {self.code}"
    
