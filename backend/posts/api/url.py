from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FarmView, SignupView, LoginView, IrrigationView, MaintenanceView, ProfileView
from .serializers import UserSerializer, IrrigationSerializer
from django.views.generic import RedirectView


signuprouter = DefaultRouter()
signuprouter.register(r'signup', SignupView, basename='signup')

loginrouter = DefaultRouter()
loginrouter.register(r'login', LoginView, basename='login')

irrigationrouter = DefaultRouter()
irrigationrouter.register(r'irrigation', IrrigationView, basename='irrigation')

farmrouter = DefaultRouter()
farmrouter.register(r'farm', FarmView, basename='farm')

maintenancerouter = DefaultRouter()
maintenancerouter.register(r'maintenance', MaintenanceView, basename='maintenance')

urlpatterns = [
    path('', RedirectView.as_view(url='/admin/', permanent=False)),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(irrigationrouter.urls)),
    path('', include(farmrouter.urls)),
    path('', include(maintenancerouter.urls)),
    path('profile/', ProfileView.as_view(), name='profile')
] 



    