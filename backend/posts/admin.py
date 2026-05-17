from django.contrib import admin
from .models import Farm, Irrigation, Maintenance

# Register your models here.
admin.site.register(Irrigation)
admin.site.register(Farm)
admin.site.register(Maintenance)

