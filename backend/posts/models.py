from django.db import models
from django.contrib.auth.models import User

    
class Irrigation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    field_name = models.CharField(max_length=255)
    water_amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.field_name} - {self.water_amount}L at {self.timestamp}"
    

class Farm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    activity_type = models.CharField(max_length=255)
    irrigating = models.BooleanField(default=False)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.activity_type} - {self.description} at {self.timestamp}"
    
