from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Role


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'get_roles', 'is_staff')
    list_filter = ('roles', 'is_staff', 'is_superuser')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('id',)
    filter_horizontal = ('roles',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información personal', {'fields': ('first_name', 'last_name', 'telefono', 'ubicacion', 'biografia', 'intereses', 'profile_image')}),
        ('Roles y permisos', {'fields': ('roles', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas importantes', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )

    def get_roles(self, obj):
        return ", ".join([r.title for r in obj.roles.all()])
    get_roles.short_description = "Roles"


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'title', 'description')
    search_fields = ('name', 'title')
