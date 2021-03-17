from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('login', obtain_jwt_token),
    path('reset_password', views.reset_password, name='reset_password'),
    path('forgot_password', views.forgot_password, name='forgot_password'),
]
