from django.urls import path
from .views import (
    TrainingSessionListView,
    TrainingSessionCreateView,
    TrainingSessionBulkDeleteView,
    get_exercise_list,
    get_muscle_list,
    get_equipment_list,
)

urlpatterns = [
    path("list", TrainingSessionListView.as_view(), name="trainingsession_list"),
    path("create", TrainingSessionCreateView.as_view(), name="trainingsession_create"),
    path(
        "delete", TrainingSessionBulkDeleteView.as_view(), name="trainingsession_delete"
    ),
    path("exercise_list", get_exercise_list, name="get_exercise_list"),
    path("muscle_list", get_muscle_list, name="get_muscle_list"),
    path("equipment_list", get_equipment_list, name="get_equipment_list"),
]
