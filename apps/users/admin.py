from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Role

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'is_staff')
    filter_horizontal = ('roles',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Role)
