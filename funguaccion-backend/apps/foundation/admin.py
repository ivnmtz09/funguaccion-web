from django.contrib import admin
from .models import Project, Donation, ActivityReport

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'coordinator', 'status', 'budget', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('status',)

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('id', 'donor', 'project', 'amount', 'date')
    search_fields = ('donor__email', 'project__title')

@admin.register(ActivityReport)
class ActivityReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'volunteer', 'project', 'hours', 'date')
    search_fields = ('volunteer__email', 'project__title')
