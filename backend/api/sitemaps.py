from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import Project, BlogPost


class ProjectSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.8

    def items(self):
        return Project.objects.all()

    def location(self, obj):
        return f"/projects/{obj.slug}"


class BlogPostSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.7

    def items(self):
        return BlogPost.objects.all()

    def lastmod(self, obj):
        return obj.published_at

    def location(self, obj):
        return f"/blog/{obj.slug}"


class StaticViewSitemap(Sitemap):
    priority = 1.0
    changefreq = "weekly"

    def items(self):
        return ['home', 'about', 'projects', 'blog', 'contact']

    def location(self, item):
        mapping = {
            'home': '/', 'about': '/about', 'projects': '/projects',
            'blog': '/blog', 'contact': '/contact',
        }
        return mapping[item]
