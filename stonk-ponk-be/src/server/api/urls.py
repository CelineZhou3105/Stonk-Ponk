from django.urls import include, path

urlpatterns = [
    path('account/', include('account.urls')),
    
]

urlpatterns = [
    path('stocks/', include('stocks.urls')),
    
]

