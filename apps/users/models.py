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
    roles = models.ManyToManyField(Role, related_name='users', blank=True)

    def __str__(self):
        return self.username
