from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProfileView, SkillCategoryListView, ExperienceListView, EducationListView,
    ProjectViewSet, BlogPostViewSet, ContactMessageCreateView, NewsletterSubscribeView,
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'posts', BlogPostViewSet, basename='post')

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('skills/', SkillCategoryListView.as_view(), name='skills'),
    path('experience/', ExperienceListView.as_view(), name='experience'),
    path('education/', EducationListView.as_view(), name='education'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact'),
    path('newsletter/', NewsletterSubscribeView.as_view(), name='newsletter'),
    path('', include(router.urls)),
]
