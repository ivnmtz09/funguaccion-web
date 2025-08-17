from rest_framework import viewsets, permissions
from .models import Document, Post
from .serializers import DocumentSerializer, PostSerializer
from .permissions import IsStaffOrReadOnly

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all().order_by('-created_at')
    serializer_class = DocumentSerializer
    permission_classes = [IsStaffOrReadOnly]

class PostPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user.is_authenticated:
            return False
        roles = [r.name for r in user.roles.all()]
        if "admin" in roles:
            return True
        if view.action in ["list", "retrieve"]:
            return True
        if "editor" in roles and view.action in ["create", "update", "partial_update"]:
            return True
        if "colaborador" in roles and view.action == "create":
            return True
        return False

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [PostPermission]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
