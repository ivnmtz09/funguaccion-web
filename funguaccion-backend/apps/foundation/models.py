from django.db import models
from apps.users.models import CustomUser

class Project(models.Model):
    STATUS_CHOICES = [
        ("planning", "En planificación"),
        ("active", "Activo"),
        ("completed", "Completado"),
        ("cancelled", "Cancelado"),
    ]

    title = models.CharField(max_length=150)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    coordinator = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="projects_coordinated")
    volunteers = models.ManyToManyField(CustomUser, related_name="projects_participated", blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="planning")
    budget = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Donation(models.Model):
    donor = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="donations")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Donación de {self.amount} a {self.project.title}"


class ActivityReport(models.Model):
    volunteer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    description = models.TextField()
    date = models.DateField(auto_now_add=True)
    hours = models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self):
        return f"Reporte de {self.volunteer} en {self.project}"
