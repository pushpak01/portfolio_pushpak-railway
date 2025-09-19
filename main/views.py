from .models import Project, Skill, Category, ContactMessage, Document
from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse


def save_contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        ContactMessage.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        messages.success(request, 'Your message has been sent successfully!')

    return redirect(reverse('index') + '#contact?from=contact')

def index(request):
    featured_projects = Project.objects.filter(featured=True)[:3]
    skills = Skill.objects.all()
    categories = Category.objects.all()
    documents = Document.objects.all()

    context = {
        'featured_projects': featured_projects,
        'skills': skills,
        'categories': categories,
        'documents': documents,
    }
    return render(request, 'index.html', context)



