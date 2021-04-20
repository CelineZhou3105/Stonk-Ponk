from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import views

urlpatterns = [
    path('check_admin', views.check_admin, name='check_admin'),
    path('make_admin', views.make_admin, name = 'make_admin'),
    path('get_stock_api_priority', views.get_stock_api_priority, name = 'get_stock_api_priority'),
    path('set_stock_api_priority', views.set_stock_api_priority, name = 'set_stock_api_priority'),
    path('get_news_api_priority', views.get_news_api_priority, name = 'get_news_api_priority'),
    path('set_news_api_priority', views.set_news_api_priority, name = 'set_news_api_priority'),
    path('get_forex_api_priority', views.get_forex_api_priority, name = 'get_forex_api_priority'),
    path('set_forex_api_priority', views.set_forex_api_priority, name = 'set_forex_api_priority')
]
