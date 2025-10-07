from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ProjectViewSet, DonationViewSet, ActivityReportViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'donations', DonationViewSet, basename='donations')
router.register(r'reports', ActivityReportViewSet, basename='activity-reports')

urlpatterns = [
    path('', include(router.urls)),
]
