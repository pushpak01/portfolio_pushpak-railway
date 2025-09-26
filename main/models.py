from django.db import models
from sorl.thumbnail import get_thumbnail


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    technologies = models.CharField(max_length=200)
    project_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def image_preview(self, obj):
        if obj.image:
            try:
                # Create or retrieve a cached 50x50 thumbnail
                thumb = get_thumbnail(obj.image, '50x50', crop='center', quality=80)
                return format_html('<img src="{}" width="50" height="50" />', thumb.url)
            except Exception:
                return "(Invalid image)"
        return "(No image)"

    image_preview.short_description = 'Preview'


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    description1 = models.TextField(default="No description available")
    description2 = models.TextField(blank=True, default="")  # Optional
    description3 = models.TextField(blank=True, default="")  # Optional
    description4 = models.TextField(blank=True, default="")  # Optional

    def __str__(self):
        return self.category.name if self.category else "Uncategorized Skill"

    class Meta:
        # Ensure each category can only have one skill entry
        unique_together = ['category']

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

class Document(models.Model):
    title = models.CharField(max_length=200)
    pdf_file = models.FileField(upload_to='pdf/', blank=True, null=True)

    def __str__(self):
        return self.title
