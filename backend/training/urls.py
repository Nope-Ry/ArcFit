from django.urls import path
from .views import (
    TrainingSessionListView,
    TrainingSessionCreateView,
    TrainingSessionBulkDeleteView,
)

urlpatterns = [
    path("list", TrainingSessionListView.as_view(), name="trainingsession_list"),
    path("create", TrainingSessionCreateView.as_view(), name="trainingsession_create"),
    path(
        "delete", TrainingSessionBulkDeleteView.as_view(), name="trainingsession_delete"
    ),
]
