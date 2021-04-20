from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import views

urlpatterns = [
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('forgot_password', views.forgot_password, name='forgot_password'),
    path('change_name' , views.change_name, name ='change_name'),
    path('change_email', views.change_email, name = 'change_email'),
    path('change_password_with_auth', views.change_password_with_auth, name = 'change_password_with_auth'),
    path('change_profile_picture', views.save_profile_picture, name='change_profile_picture'),
    path('get_user_details', views.get_user_details, name = 'get_user_details')
]
