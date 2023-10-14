from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import RecruiteeUser, CompanyUser

User = get_user_model()


class RecruiteeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecruiteeUser
        fields = ['username', 'email', 'password', 'cv']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        return RecruiteeUser.objects.create_user(**validated_data)


class CompanyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyUser
        fields = ['username', 'email', 'password', 'company']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        return CompanyUser.objects.create_user(**validated_data)
