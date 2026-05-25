import os
import requests  # Dropped resend, using raw HTTP requests for Brevo
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated

# Models and Serializers
from posts.models import Irrigation as IrrigationModel
from posts.models import Maintenance
from posts.models import Farm 
from posts.models import VerificationCode
from .serializers import UserSerializer, IrrigationSerializer, FarmSerializer, MaintenanceSerializer


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            # Double check to prevent database unique constraint collisions
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already taken'}, status=400)

            # 1. Create the user profile safely as inactive
            user = User.objects.create_user(username=username, email=email, password=password, is_active=False)

            # 2. Generate token verification data
            verification, _ = VerificationCode.objects.get_or_create(user=user)
            verification.generate_code()

            # 3. Pull settings safely from Render dashboard parameters
            brevo_key = os.environ.get("BREVO_API_KEY")
            from_email = os.environ.get("DEFAULT_FROM_EMAIL")

            if not brevo_key:
                print("CRITICAL CONFIG ERROR: BREVO_API_KEY variable missing on Render settings.")
                return Response({'error': 'Email provider not configured correctly.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            if not from_email:
                print("CRITICAL CONFIG ERROR: DEFAULT_FROM_EMAIL variable missing on Render settings.")
                return Response({'error': 'Sender identity not configured correctly.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # 4. Wrap Brevo HTTP API call in a try-except layer
            try:
                url = "https://api.brevo.com/v3/smtp/email"
                headers = {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "api-key": brevo_key
                }
                
                html_content = f"""
                    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <h2 style="color: #16a34a; margin-bottom: 4px;">Holland Greentech Ghana</h2>
                        <h3 style="color: #475569; margin-top: 0; font-weight: normal;">LogTracker Account Verification</h3>
                        <p>Hi {username},</p>
                        <p>Thank you for signing up. Use the verification code below to activate your account:</p>
                        <div style="font-size: 32px; font-weight: bold; color: #16a34a; letter-spacing: 6px; text-align: center; padding: 16px; background: #f0fdf4; border-radius: 8px; margin: 24px 0;">
                            {verification.code}
                        </div>
                        <p style="color: #64748b; font-size: 14px;">This code expires in 24 hours.</p>
                        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                        <p style="color: #94a3b8; font-size: 12px;">If you did not initiate this request, please disregard this email safely.</p>
                    </div>
                """

                payload = {
                    "sender": {
                        "name": "Holland Greentech Ghana",
                        "email": from_email
                    },
                    "to": [
                        {
                            "email": email,
                            "name": username
                        }
                    ],
                    "subject": "Verify your HGT LogTracker account",
                    "htmlContent": html_content
                }

                response = requests.post(url, json=payload, headers=headers)
                
                # Force an exception if the API returns a bad status code (e.g., 401 Unauthorized, 400 Bad Request)
                response.raise_for_status()

            except Exception as email_err:
                print(f"Brevo REST API Engine Error: {str(email_err)}")
                # Hand back a clean 201 so the frontend handles registration tracking cleanly
                return Response({
                    'message': 'Account created, but verification email failed to dispatch. Please attempt to resend code.',
                    'error': str(email_err)
                }, status=status.HTTP_201_CREATED)

            return Response({'message': 'Account created. Please check your email for a verification code.'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        code = request.data.get('code')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            verification = VerificationCode.objects.get(user=user, code=code)
        except VerificationCode.DoesNotExist:
            return Response({'error': 'Invalid verification code'}, status=status.HTTP_400_BAD_REQUEST)

        # Flip flag to true to allow standard authentication logic to parse cleanly
        user.is_active = True
        user.save()
        verification.delete()

        token, _ = Token.objects.get_or_create(user=user)
        return Response({'message': 'Email verified successfully', 'token': token.key}, status=status.HTTP_200_OK)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try: 
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Note: authenticate will automatically return None if user.is_active is False
        user = authenticate(request, username=user.username, password=password)
        
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'message': 'Login successful', 'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials or unverified email account.'}, status=status.HTTP_401_UNAUTHORIZED)


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
        
        # Rotate auth keys on profile updates
        Token.objects.filter(user=user).delete()
        new_token, _ = Token.objects.get_or_create(user=user)
        return Response({'message': 'Password changed successfully', 'token': new_token.key}, status=status.HTTP_200_OK)


# --- ViewSets for Farm Operations ---

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