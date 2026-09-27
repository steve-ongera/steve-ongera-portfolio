from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import (
    Profile, SkillCategory, Experience, Education,
    Project, BlogPost, ContactMessage, NewsletterSubscriber
)
from .serializers import (
    ProfileSerializer, SkillCategorySerializer, ExperienceSerializer,
    EducationSerializer, ProjectListSerializer, ProjectDetailSerializer,
    BlogPostListSerializer, BlogPostDetailSerializer,
    ContactMessageSerializer, NewsletterSubscriberSerializer,
)


class ProfileView(APIView):
    """GET /api/profile/ — Steve Ongera's resume header info, used across the whole site."""

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({"detail": "Profile not configured yet."}, status=404)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)


class SkillCategoryListView(generics.ListAPIView):
    """GET /api/skills/ — grouped skills for the About/Resume section."""
    queryset = SkillCategory.objects.prefetch_related('skills').all()
    serializer_class = SkillCategorySerializer


class ExperienceListView(generics.ListAPIView):
    """GET /api/experience/"""
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class EducationListView(generics.ListAPIView):
    """GET /api/education/"""
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/projects/            — list (supports ?featured=true & ?category=)
    GET /api/projects/{slug}/     — detail
    """
    queryset = Project.objects.all()
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        featured = self.request.query_params.get('featured')
        category = self.request.query_params.get('category')
        if featured == 'true':
            qs = qs.filter(is_featured=True)
        if category:
            qs = qs.filter(category=category)
        return qs


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/posts/            — list (supports ?featured=true)
    GET /api/posts/{slug}/     — detail
    """
    queryset = BlogPost.objects.all()
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BlogPostDetailSerializer
        return BlogPostListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            qs = qs.filter(is_featured=True)
        return qs


class ContactMessageCreateView(generics.CreateAPIView):
    """POST /api/contact/ — contact form submission from the React frontend."""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer


class NewsletterSubscribeView(generics.CreateAPIView):
    """POST /api/newsletter/ — newsletter signup, mirrors the template's 'Sign In' box."""
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        existing = NewsletterSubscriber.objects.filter(email=email).first()
        if existing:
            return Response({"detail": "You're already subscribed."}, status=status.HTTP_200_OK)
        return super().create(request, *args, **kwargs)
