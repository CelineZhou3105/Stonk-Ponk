from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import views

urlpatterns = [
    path('create_watchlist', views.create_watchlist, name='create_watchlist'),
    path('delete_watchlist', views.delete_watchlist, name='deltet_watchlist'),
    path('add_stock_to_watchlist', views.add_stock_to_watchlist, name='add_stock_to_watchlist'),
    path('remove_stock_from_watchlist', views.remove_stock_from_watchlist, name='remove_stock_from_watchlist'),
    path('get_watchlists', views.get_watchlists, name='get_watchlists'),
    path('get_watchlist_stocks', views.get_watchlist_stocks, name='get_watchlist_stocks'),
]
