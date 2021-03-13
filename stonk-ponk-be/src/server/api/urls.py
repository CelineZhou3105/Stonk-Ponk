from django.urls import include, path

urlpatterns = [
    path('account/', include('api.account.urls')),
]
