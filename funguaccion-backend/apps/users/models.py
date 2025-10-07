from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El correo electrónico es obligatorio")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("El superusuario debe tener is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("El superusuario debe tener is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    permissions = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.title


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    ubicacion = models.CharField(max_length=255, blank=True, null=True)
    biografia = models.TextField(blank=True, null=True)
    intereses = models.TextField(blank=True, null=True)
    roles = models.ManyToManyField(Role, related_name="users", blank=True)
    profile_image = models.ImageField(upload_to="profiles/", blank=True, null=True)

    # Campos obligatorios de Django
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
