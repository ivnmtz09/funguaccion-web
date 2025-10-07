from rest_framework import status, permissions, generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model, login, logout as django_logout
from django.contrib.auth.models import update_last_login

from .models import CustomUser, Role
from .serializers import (
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    RoleSerializer,
    UserDetailSerializer,
    UserSerializer,
    UpdateProfileSerializer,
    UserUpdateSerializer,
)

User = get_user_model()


# -------------------- REGISTRO --------------------
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserDetailSerializer(user).data
        }, status=status.HTTP_201_CREATED)


# -------------------- LOGIN --------------------
class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user

        login(request, user)
        update_last_login(None, user)

        return response


# -------------------- LOGOUT --------------------
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        django_logout(request)
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Sesión cerrada correctamente."}, status=status.HTTP_205_RESET_CONTENT)
        except KeyError:
            return Response({"detail": "El campo 'refresh' es obligatorio."}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError:
            return Response({"detail": "Token inválido o ya expirado."}, status=status.HTTP_400_BAD_REQUEST)


# -------------------- PERFIL --------------------
class UserMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data)


class UpdateProfileView(generics.UpdateAPIView):
    serializer_class = UpdateProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_object(self):
        return self.request.user


# -------------------- ADMIN USERS --------------------
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return UserUpdateSerializer
        return UserDetailSerializer

    @action(detail=True, methods=['get', 'put'], permission_classes=[IsAdminUser])
    def roles(self, request, pk=None):
        user = self.get_object()

        if request.method == 'GET':
            roles = user.roles.all()
            serializer = RoleSerializer(roles, many=True)
            return Response(serializer.data)

        if request.method == 'PUT':
            role_ids = request.data.get('role_ids', [])
            roles = Role.objects.filter(id__in=role_ids)
            user.roles.set(roles)
            return Response({'message': 'Roles actualizados correctamente.'})


# -------------------- PERMISOS --------------------
class UserPermissionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        permissions = {}

        for role in user.roles.all():
            for key, value in role.permissions.items():
                permissions[key] = permissions.get(key, False) or value

        return Response(permissions)
