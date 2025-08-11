from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Role

class CustomUserAdmin(UserAdmin):

    def get_roles(self, obj):
        return ", ".join([r.title for r in obj.roles.all()])
    get_roles.short_description = "Roles"

    model = CustomUser
    list_display = ('id', 'username', 'first_name', 'last_name', 'email', 'get_roles', 'is_staff')
    list_filter = ('roles', 'is_staff', 'is_superuser')
    filter_horizontal = ('roles',)
    search_fields = ('username', 'email')
    ordering = ('id',)

    fieldsets = UserAdmin.fieldsets + (
        ('Información adicional', {
            'fields': ('telefono', 'ubicacion', 'biografia', 'intereses'),
        }),
        ('Roles de usuario', {
            'fields': ('roles',),
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Información adicional', {
            'fields': ('telefono', 'ubicacion', 'biografia', 'intereses'),
        }),
        ('Roles de usuario', {
            'fields': ('roles',),
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Role)
