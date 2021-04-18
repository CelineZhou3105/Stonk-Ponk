from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import views

urlpatterns = [
    path('edit', views.edit, name='portfolio-edit'),
    path('summary', views.summary, name='portfolio-summary'),
    path('details', views.details, name='portfolio-details'),
    path('best', views.best, name='portfolio-best'),
    path('worst', views.worst, name='portfolio-worst'),
    path('metrics', views.metrics, name='portfolio-metrics'),
]
