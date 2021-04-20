from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import views

urlpatterns = [
    path('check_admin', views.check_admin, name='check_admin')
]
