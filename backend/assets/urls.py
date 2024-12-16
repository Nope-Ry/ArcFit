from django.urls import path
from .views import get_asset_metadata

urlpatterns = [
    path('metadata', get_asset_metadata, name='asset_metadata'),
]
