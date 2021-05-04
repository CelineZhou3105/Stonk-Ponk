from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import views

urlpatterns = [
    path('create_watchlist', views.create_watchlist, name='create_watchlist'),
    path('delete_watchlist', views.delete_watchlist, name='deltet_watchlist'),
    path('save_watchlist', views.save_watchlist, name='save_watchlist'),
    path('get_watchlists', views.get_watchlists, name='get_watchlists'),
    path('get_watchlist_stocks', views.get_watchlist_stocks, name='get_watchlist_stocks'),
]
