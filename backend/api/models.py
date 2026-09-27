from django.db import models
from django.utils.text import slugify


class Profile(models.Model):
    """Singleton-style model holding Steve Ongera's core resume info."""
    full_name = models.CharField(max_length=120, default="Steve Ongera")
    tagline = models.CharField(
        max_length=200,
        default="Backend Developer — Django REST Framework & React/Vite"
    )
    bio = models.TextField(
        default="Backend-focused full-stack developer building scalable "
                 "Django REST Framework APIs paired with fast, modern React/Vite frontends."
    )
    email = models.EmailField(default="steve.ongera@example.com")
    phone = models.CharField(max_length=30, blank=True)
    location = models.CharField(max_length=100, default="Nairobi, Kenya")
    avatar = models.URLField(
        default="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
        help_text="Placeholder Unsplash image — replace with a real photo later."
    )
    resume_file = models.FileField(upload_to="resume/", blank=True, null=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    meta_description = models.CharField(
        max_length=160,
        default="Steve Ongera — Backend Developer specializing in Django REST "
                 "Framework and React/Vite, building web apps for East African markets.",
        help_text="Used as the site-wide SEO meta description."
    )
    meta_keywords = models.CharField(
        max_length=255,
        default="Steve Ongera, Django developer Kenya, React Vite developer, "
                 "backend developer Nairobi, Django REST Framework, full stack developer Kenya"
    )

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.full_name


class SkillCategory(models.Model):
    name = models.CharField(max_length=80)
    icon = models.CharField(max_length=50, blank=True, help_text="Icon keyword, e.g. 'server', 'code'")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = "Skill categories"

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    proficiency = models.PositiveIntegerField(default=80, help_text="0-100")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} ({self.proficiency}%)"


class Experience(models.Model):
    role = models.CharField(max_length=120)
    company = models.CharField(max_length=120)
    location = models.CharField(max_length=100, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.role} @ {self.company}"


class Education(models.Model):
    institution = models.CharField(max_length=150)
    qualification = models.CharField(max_length=150)
    start_year = models.PositiveIntegerField()
    end_year = models.PositiveIntegerField(null=True, blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-start_year']

    def __str__(self):
        return f"{self.qualification} — {self.institution}"


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('django', 'Django'),
        ('react', 'React'),
        ('fullstack', 'Full Stack'),
        ('api', 'API'),
        ('fintech', 'Fintech'),
        ('healthcare', 'Healthcare'),
    ]
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=170, unique=True, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='fullstack')
    summary = models.CharField(max_length=250)
    description = models.TextField()
    tech_stack = models.CharField(max_length=255, help_text="Comma-separated, e.g. Django, DRF, React, Vite, PostgreSQL")
    image = models.URLField(
        default="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
    )
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    date_completed = models.DateField()
    meta_description = models.CharField(max_length=160, blank=True)

    class Meta:
        ordering = ['-date_completed']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    @property
    def tech_list(self):
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    excerpt = models.CharField(max_length=250)
    content = models.TextField()
    cover_image = models.URLField(
        default="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    )
    tags = models.CharField(max_length=200, blank=True, help_text="Comma-separated tags")
    is_featured = models.BooleanField(default=False)
    published_at = models.DateTimeField()
    meta_description = models.CharField(max_length=160, blank=True)

    class Meta:
        ordering = ['-published_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    @property
    def tag_list(self):
        return [t.strip() for t in self.tags.split(',') if t.strip()]


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.subject or 'No subject'}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
