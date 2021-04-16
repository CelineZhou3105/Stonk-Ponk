from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import views

urlpatterns = [
    path('get_news', views.get_stock_news, name='get_news'),
    path('get_market_news', views.get_market_news, name='get_market_news')
]