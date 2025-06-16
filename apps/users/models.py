from django.contrib.auth.models import AbstractUser
from django.db import models

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    roles = models.ManyToManyField(Role, related_name='users', blank=True)

    def __str__(self):
        return self.username
