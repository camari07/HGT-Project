from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from posts.models import Irrigation as IrrigationModel
from posts.models import Maintenance
from posts.models import Farm 
from .serializers import UserSerializer, IrrigationSerializer, FarmSerializer, MaintenanceSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated


class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']  
            password = serializer.validated_data['password']

            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already taken'}, status=400)
            
            user = User.objects.create_user(username=username, email=email, password=password)
            token, created = Token.objects.get_or_create(user=user)
            
            return Response({'message': 'User created successfully', 'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try: 
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        user = authenticate(request, username=user.username, password=password)
        
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'message': 'Login successful', 'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        
class IrrigationView(ModelViewSet):
    serializer_class = IrrigationSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = IrrigationModel.objects.all()

    def get_queryset(self):
        return IrrigationModel.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FarmView(ModelViewSet):
    serializer_class = FarmSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Farm.objects.all()

    def get_queryset(self):
        return Farm.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MaintenanceView(ModelViewSet):
    serializer_class = MaintenanceSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Maintenance.objects.all()

    def get_queryset(self):
        return Maintenance.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
            'irrigation_count': IrrigationModel.objects.filter(user=user).count(),
            'farm_count': Farm.objects.filter(user=user).count(),
            'maintenance_count': Maintenance.objects.filter(user=user).count(),
        }, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({'error': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        token, _ = Token.objects.get_or_create(user=user)
        token.delete()
        new_token, _ = Token.objects.get_or_create(user=user)
        return Response({'message': 'Password changed successfully', 'token': new_token.key}, status=status.HTTP_200_OK)