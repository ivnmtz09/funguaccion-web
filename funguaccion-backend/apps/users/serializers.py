from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from apps.users.models import Role

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )

        # Asignar rol por defecto
        role, _ = Role.objects.get_or_create(name='visitante', defaults={'title': 'Visitante', 'description': 'Usuario básico del sistema'})
        user.roles.add(role)

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['user'] = {
            "id": user.id,
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
        fields = ['id', 'name', 'title', 'description']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "email", "first_name", "last_name",
            "telefono", "ubicacion", "biografia", "intereses", "profile_image"
        ]


class UserDetailSerializer(UserSerializer):
    roles = RoleSerializer(many=True)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['roles']


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'biografia', 'telefono', 'ubicacion', 'intereses', 'profile_image']


class UserUpdateSerializer(serializers.ModelSerializer):
    role_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Role.objects.all(),
        source="roles"
    )

    class Meta:
        model = User
        fields = [
            "id", "email", "first_name", "last_name",
            "telefono", "ubicacion", "biografia", "intereses", "profile_image", "role_ids"
        ]
