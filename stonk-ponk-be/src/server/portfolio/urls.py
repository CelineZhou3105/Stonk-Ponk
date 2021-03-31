from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import views

urlpatterns = [
    path('portfolio-edit', views.edit, name='portfolio-edit'),
    path('portfolio-summary', views.summary, name='portfolio-summary'),
    path('portfolio-details', views.details, name='portfolio-details'),
    path('portfolio-best', views.best, name='portfolio-best'),
    path('portfolio-worst', views.worst, name='portfolio-worst'),
]
