from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('api/students/', views.student_api),
    path('api/students/<int:student_id>/', views.student_detail),
]
