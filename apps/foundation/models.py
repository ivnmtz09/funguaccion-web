from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Document(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    file = models.FileField(upload_to='documents/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Post(models.Model):
    CATEGORY_CHOICES = [
        ("news", "Noticia"),
        ("blog", "Blog"),
        ("event", "Evento"),
    ]
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    author = models.ForeignKey("users.CustomUser", on_delete=models.CASCADE, related_name="posts")
    cover = models.ImageField(upload_to="posts/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=[("draft", "Borrador"), ("published", "Publicado")], default="draft")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="posts")

    def __str__(self):
        return f"{self.title} ({self.category})"
