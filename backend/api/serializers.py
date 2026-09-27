from rest_framework import serializers
from .models import (
    Profile, SkillCategory, Skill, Experience, Education,
    Project, BlogPost, ContactMessage, NewsletterSubscriber
)


class ProfileSerializer(serializers.ModelSerializer):
    resume_file = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'full_name', 'tagline', 'bio', 'email', 'phone', 'location',
            'avatar', 'resume_file', 'github_url', 'linkedin_url',
            'twitter_url', 'instagram_url', 'meta_description', 'meta_keywords',
        ]

    def get_resume_file(self, obj):
        request = self.context.get('request')
        if obj.resume_file and hasattr(obj.resume_file, 'url'):
            return request.build_absolute_uri(obj.resume_file.url) if request else obj.resume_file.url
        return None


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'proficiency', 'order']


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'icon', 'order', 'skills']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id', 'role', 'company', 'location', 'start_date',
            'end_date', 'is_current', 'description',
        ]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'institution', 'qualification', 'start_year', 'end_year', 'description']


class ProjectListSerializer(serializers.ModelSerializer):
    tech_list = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'summary', 'image',
            'tech_list', 'is_featured', 'date_completed',
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    tech_list = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'summary', 'description',
            'tech_list', 'image', 'live_url', 'github_url', 'is_featured',
            'date_completed', 'meta_description',
        ]


class BlogPostListSerializer(serializers.ModelSerializer):
    tag_list = serializers.ReadOnlyField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'cover_image',
            'tag_list', 'is_featured', 'published_at',
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    tag_list = serializers.ReadOnlyField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'cover_image',
            'tag_list', 'is_featured', 'published_at', 'meta_description',
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'subscribed_at']
        read_only_fields = ['id', 'subscribed_at']
