from django.views.decorators.cache import cache_page

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, CreateAPIView, GenericAPIView
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from rest_framework.decorators import api_view

from knox.auth import TokenAuthentication

from .models import TrainingSession, Exercise, Muscle, Equipment
from .serializers import (
    TrainingSessionSerializer,
    TrainingSessionIdSerializer,
    ExerciseSerializer,
    MuscleSerializer,
    EquipmentSerializer,
)


class TrainingSessionListView(ListAPIView):
    serializer_class = TrainingSessionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        filter_kwargs = {
            "user": self.request.user,
            "start_time__gte": self.request.query_params.get("start_time", None),  # type: ignore
            "start_time__lte": self.request.query_params.get("end_time", None),  # type: ignore
        }
        filter_kwargs = {k: v for k, v in filter_kwargs.items() if v is not None}

        return TrainingSession.objects.filter(**filter_kwargs)


class TrainingSessionCreateView(CreateAPIView):
    serializer_class = TrainingSessionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class TrainingSessionBulkDeleteView(GenericAPIView):
    serializer_class = TrainingSessionIdSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TrainingSession.objects.filter(user=self.request.user)

    def delete(self, request, *args, **kwargs):
        ids = request.data.get("ids", [])
        serializer = self.get_serializer(data=[{"id": id} for id in ids], many=True)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=HTTP_400_BAD_REQUEST,
            )

        queryset = self.get_queryset()
        objects_to_delete = queryset.filter(id__in=ids)
        self.perform_bulk_destroy(objects_to_delete)

        return Response(status=HTTP_204_NO_CONTENT)

    def perform_bulk_destroy(self, objects):
        objects.delete()


@cache_page(60 * 15)
@api_view(["GET"])
def get_exercise_list(request):
    return Response(
        ExerciseSerializer(Exercise.objects.all(), many=True).data, status=HTTP_200_OK
    )


@cache_page(60 * 15)
@api_view(["GET"])
def get_muscle_list(request):
    return Response(
        MuscleSerializer(Muscle.objects.all(), many=True).data, status=HTTP_200_OK
    )


@cache_page(60 * 15)
@api_view(["GET"])
def get_equipment_list(request):
    return Response(
        EquipmentSerializer(Equipment.objects.all(), many=True).data, status=HTTP_200_OK
    )
