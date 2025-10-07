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
            "telefono", "ubicacion", "biografia", "intereses", "profile_image"
        ]


class UserDetailSerializer(UserSerializer):
    roles = RoleSerializer(many=True)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['roles']

class UpdateProfileSerializer(serializers.ModelSerializer):
    intereses = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    first_name = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    last_name = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    email = serializers.EmailField(required=False, allow_blank=True, allow_null=True)
    biografia = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    telefono = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    ubicacion = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    profile_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'biografia', 'telefono', 'ubicacion', 'intereses', 'profile_image']

    def to_internal_value(self, data):
        processed_data = data.copy()
        
        # Handle string fields - convert null to empty string
        string_fields = ['first_name', 'last_name', 'email', 'biografia', 'telefono', 'ubicacion']
        for field in string_fields:
            if field in processed_data and processed_data[field] is None:
                processed_data[field] = ''
        
        if 'intereses' in processed_data:
            if processed_data['intereses'] is None:
                processed_data['intereses'] = ''
            elif isinstance(processed_data['intereses'], list):
                # Filter out empty strings and join
                clean_interests = [interest.strip() for interest in processed_data['intereses'] if interest and interest.strip()]
                processed_data['intereses'] = ', '.join(clean_interests) if clean_interests else ''
            elif not isinstance(processed_data['intereses'], str):
                processed_data['intereses'] = str(processed_data['intereses'])
        
        return super().to_internal_value(processed_data)

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            if value == '' and getattr(instance._meta.get_field(field), 'null', False):
                setattr(instance, field, None)
            else:
                setattr(instance, field, value)
        
        instance.save()
        return instance

class UserUpdateSerializer(serializers.ModelSerializer):
    role_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Role.objects.all(),
        source="roles"
    )

    class Meta:
        model = CustomUser
        fields = [
            "id", "username", "first_name", "last_name", "email",
            "telefono", "ubicacion", "biografia", "intereses", "profile_image",
            "role_ids"
        ]
