from django.urls import include, path

urlpatterns = [
    path('account/', include('account.urls')),
    path('stocks/', include('stocks.urls')),
]    

