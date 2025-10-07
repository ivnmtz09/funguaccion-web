from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Project, Donation, ActivityReport
from .serializers import ProjectSerializer, DonationSerializer, ActivityReportSerializer
from apps.users.permissions import (
    CanManageProjects,
    CanSubmitReports,
    CanManageFinances,
)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), CanManageProjects()]
        return [IsAuthenticated()]


class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all().order_by('-date')
    serializer_class = DonationSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsAuthenticated(), CanManageFinances()]
        return [IsAuthenticated()]


class ActivityReportViewSet(viewsets.ModelViewSet):
    queryset = ActivityReport.objects.all().order_by('-date')
    serializer_class = ActivityReportSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [IsAuthenticated(), CanSubmitReports()]
        return [IsAuthenticated()]
