from django.urls import path
from .views import index_list

app_name = 'frontend'


urlpatterns = [
    path('', index_list, name="index"),
]