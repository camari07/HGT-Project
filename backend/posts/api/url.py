from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignupView, LoginView, Irrigation
from .serializers import UserSerializer, TokenSerializer, IrrigationSerializer
from django.views.generic import RedirectView


signuprouter = DefaultRouter()
signuprouter.register(r'signup', SignupView, basename='signup')

loginrouter = DefaultRouter()
loginrouter.register(r'login', LoginView, basename='login')

irrigationrouter = DefaultRouter()
irrigationrouter.register(r'irrigation', Irrigation, basename='irrigation')


urlpatterns = [
    path('', RedirectView.as_view(url='/admin/', permanent=False)),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('irrigation/', include(irrigationrouter.urls)),
] 



