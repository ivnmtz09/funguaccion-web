from rest_framework import permissions

class RolePermission(permissions.BasePermission):
    """
    Permiso base: verifica si el usuario tiene un permiso específico según su rol.
    """

    required_permission = None  # Se define en las subclases

    def has_permission(self, request, view):
        user = request.user

        # Debe estar autenticado
        if not user or not user.is_authenticated:
            return False

        # Si es superusuario, puede hacer todo
        if user.is_superuser:
            return True

        # Si no se define un permiso concreto, basta con estar autenticado
        if not self.required_permission:
            return True

        # Combinar permisos de todos los roles del usuario
        combined_permissions = {}
        for role in getattr(user, "roles", []).all():
            for key, value in role.permissions.items():
                combined_permissions[key] = combined_permissions.get(key, False) or value

        # Validar el permiso requerido
        return combined_permissions.get(self.required_permission, False)


# ------------------------------------------------------------
# Subclases específicas por permiso
# ------------------------------------------------------------

class CanManageProjects(RolePermission):
    required_permission = "manage_projects"


class CanAssignVolunteers(RolePermission):
    required_permission = "assign_volunteers"


class CanSubmitReports(RolePermission):
    required_permission = "submit_activity_reports"


class CanManageFinances(RolePermission):
    required_permission = "manage_finances"


class CanViewPublic(RolePermission):
    required_permission = "view_public_content"
