from rest_framework.routers import DefaultRouter
from posts.api.views import SignupView, LoginView
from posts.api.url import signuprouter, loginrouter
from django.urls import path, include

router = DefaultRouter()

router.registry.extend(signuprouter.registry)
router.registry.extend(loginrouter.registry)

urlpatterns = [
    path("", include(router.urls)),
]