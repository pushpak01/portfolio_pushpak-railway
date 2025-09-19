from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('save-contact/', views.save_contact, name='save_contact'),
]