from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.users.models import Role
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        # Crear usuario
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )

        # Asignar rol visitante por defecto
        role, _ = Role.objects.get_or_create(name='visitante')
        user.roles.add(role)

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['user'] = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "biografia": user.biografia,
            "telefono": user.telefono,
            "ubicacion": user.ubicacion,
            "intereses": user.intereses,
            "roles": [role.name for role in user.roles.all()],
        }
        return data


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['name', 'title', 'description']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id", "username", "first_name", "last_name", "email",
            "telefono", "ubicacion", "biografia", "intereses"
        ]


class UserDetailSerializer(UserSerializer):
    roles = RoleSerializer(many=True)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['roles']

class UpdateProfileSerializer(serializers.ModelSerializer):
    intereses = serializers.ListField(child=serializers.CharField(), required=False, allow_empty=True)

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'biografia', 'telefono', 'ubicacion', 'intereses']

    def to_internal_value(self, data):
        # Convierte intereses a string si viene como lista
        if 'intereses' in data and isinstance(data['intereses'], list):
            data['intereses'] = ', '.join(data['intereses'])
        return super().to_internal_value(data)
