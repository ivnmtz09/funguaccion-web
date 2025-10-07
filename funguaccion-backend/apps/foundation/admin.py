from django.contrib import admin
from .models import Document, Post, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title", "description")
    list_filter = ("created_at",)
    ordering = ("-created_at",)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "status", "author", "created_at")
    search_fields = ("title", "content", "author__username")
    list_filter = ("category", "status", "created_at")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-created_at",)
