from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from posts.models import User, Token, Irrigation
from .serializers import UserSerializer, TokenSerializer, IrrigationSerializer
from django.conf import settings
from datetime import datetime, timedelta
import hashlib
import uuid
from django.utils import timezone
from rest_framework.viewsets import ModelViewSet

# Create your views here.

class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Hash the password before saving
            password = serializer.validated_data['password']
            hashed_password = make_password(password)
            serializer.validated_data['password'] = hashed_password
            
            user = serializer.save()
            
            # Generate a token for the user
            #token_value = hashlib.sha256((str(uuid.uuid4()) + user.username).encode()).hexdigest()
            #token_expiry = timezone.now() + timedelta(days=7)  # Token valid for 7 days
            #token = Token.objects.create(user=user, value=token_value, expires_at=token_expiry)

            #from rest_framework.authtoken.models import Token as AuthToken
            #token, created = AuthToken.objects.get_or_create(user=user)
            
            # Send a welcome email to the user
            
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.get(email=email)
        hashed_password = make_password(password)
        
        if user is None or user.password != hashed_password:
            return Response(
                {
                    "success": False,
                    "message": "Invalid Login Credentials!",
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"success": True, "message": "You are now logged in!"},
                status=status.HTTP_200_OK,
            )

        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                # Generate a new token for the user
                token_value = hashlib.sha256((str(uuid.uuid4()) + user.username).encode()).hexdigest()
                token_expiry = timezone.now() + timedelta(days=7)  # Token valid for 7 days
                token = Token.objects.create(user=user, value=token_value, expires_at=token_expiry)
                
                return Response({'message': 'Login successful', 'token': token.value}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
class Irrigation(ModelViewSet):
    serializer_class = IrrigationSerializer
    queryset = Irrigation.objects.all()
