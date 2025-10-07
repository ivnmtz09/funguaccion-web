from rest_framework import serializers
from .models import Project, Donation, ActivityReport
from apps.users.serializers import UserSerializer


class ProjectSerializer(serializers.ModelSerializer):
    coordinator = UserSerializer(read_only=True)
    volunteers = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Project
        fields = '__all__'


class DonationSerializer(serializers.ModelSerializer):
    donor = UserSerializer(read_only=True)
    project_title = serializers.CharField(source='project.title', read_only=True)

    class Meta:
        model = Donation
        fields = ['id', 'donor', 'project', 'project_title', 'amount', 'date', 'notes']


class ActivityReportSerializer(serializers.ModelSerializer):
    volunteer = UserSerializer(read_only=True)
    project_title = serializers.CharField(source='project.title', read_only=True)

    class Meta:
        model = ActivityReport
        fields = ['id', 'volunteer', 'project', 'project_title', 'description', 'date', 'hours']
