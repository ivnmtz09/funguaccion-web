from rest_framework import serializers
from .models import Document, Post, Category, Suggestion


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"
        read_only_fields = ("created_at",)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]
        read_only_fields = ("id",)


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    # Para leer la categoría anidada
    category = CategorySerializer(read_only=True)
    # Para crear/actualizar usando el id
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True,
        required=True
    )

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "content",
            "author",
            "cover",
            "status",
            "created_at",
            "updated_at",
            "category",     # lectura
            "category_id"   # escritura
        ]
        read_only_fields = ("id", "slug", "author", "created_at", "updated_at")

    def get_author(self, obj):
        """Retorna el nombre completo del autor"""
        if obj.author:
            # Si el usuario tiene first_name y last_name, los combina
            if obj.author.first_name and obj.author.last_name:
                return f"{obj.author.first_name} {obj.author.last_name}"
            # Si solo tiene first_name
            elif obj.author.first_name:
                return obj.author.first_name
            # Si solo tiene last_name
            elif obj.author.last_name:
                return obj.author.last_name
            # Si no tiene ninguno, usa el username
            else:
                return obj.author.username
        return "Anónimo"

    def validate_title(self, value):
        """Validar que el título no esté vacío"""
        if not value.strip():
            raise serializers.ValidationError("El título no puede estar vacío")
        return value

    def validate_content(self, value):
        """Validar que el contenido tenga al menos 10 caracteres"""
        if len(value.strip()) < 10:
            raise serializers.ValidationError("El contenido debe tener al menos 10 caracteres")
        return value

class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = "__all__"
