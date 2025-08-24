from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Document, Post, Category, Suggestion
from .serializers import DocumentSerializer, PostSerializer, CategorySerializer, SuggestionSerializer
from .permissions import IsStaffOrReadOnly

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all().order_by('-created_at')
    serializer_class = DocumentSerializer
    permission_classes = [IsStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'title']

class PostPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Para operaciones de lectura (list, retrieve), permitir acceso sin autenticación
        if view.action in ["list", "retrieve"]:
            return True
        
        # Para otras operaciones, requerir autenticación
        if not request.user.is_authenticated:
            return False
            
        roles = [r.name for r in request.user.roles.all()]
        if "admin" in roles:
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
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status', 'author']
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'updated_at', 'title']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name']

class SuggestionViewSet(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all().order_by('-created_at')
    serializer_class = SuggestionSerializer