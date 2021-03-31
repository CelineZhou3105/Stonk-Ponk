from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import views

urlpatterns = [
    path('markets', views.markets, name='markets')
    path('stock_detail', view.stock_data, name='stock_detail')
]
