from django.contrib.auth.models import AbstractUser
from django.db import models

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    permissions = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.title



class CustomUser(AbstractUser):
    telefono = models.CharField(max_length=20, blank=True, null=True)
    ubicacion = models.CharField(max_length=255, blank=True, null=True)
    biografia = models.TextField(blank=True, null=True)
    intereses = models.TextField(blank=True, null=True)
    roles = models.ManyToManyField(Role, related_name='users', blank=True)
    profile_image = models.ImageField(upload_to="profiles/", blank=True, null=True)

    def __str__(self):
        return self.username
