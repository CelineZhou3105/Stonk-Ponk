from django.urls import include, path

urlpatterns = [
    path('account/', include('account.urls')),
    path('stocks/', include('stocks.urls')),
    path('portfolio/', include('portfolio.urls')),
    path('news/', include('news.urls')),
    path('watchlist/', include('watchlist.urls'))
]    

