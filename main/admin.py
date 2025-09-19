from django.contrib import admin
from .models import Project, Skill, Category, ContactMessage, Document

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'featured', 'date_created')
    list_filter = ('featured', 'date_created')
    search_fields = ('title',)
    list_editable = ('featured',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = [ 'category', 'description1']
    list_filter = ['category']
    search_fields = ['category__name']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'timestamp']
    list_filter = ['timestamp']
    search_fields = ['name', 'email']

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'pdf_file')