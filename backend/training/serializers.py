from jsonschema import ValidationError as JSONValidationError

from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    IntegerField,
    ValidationError,
)

from .models import Exercise, TrainingSession
from .schemas import VALIDATOR


class TrainingSessionSerializer(ModelSerializer):
    class Meta:
        model = TrainingSession
        fields = [
            "id",
            "start_time",
            "duration_seconds",
            "records",
        ]

    def validate_records(self, value):
        try:
            VALIDATOR.validate(value)
        except JSONValidationError as e:
            raise ValidationError(f"Invalid records: {e.message}")
        exercise_ids = set(v["m_id"] for v in value)
        valid_ids = Exercise.objects.filter(id__in=exercise_ids).values_list(
            "id", flat=True
        )
        if set(valid_ids) != exercise_ids:
            raise ValidationError("Invalid records: invalid exercise id found.")
        return value

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class TrainingSessionIdSerializer(Serializer):
    id = IntegerField(min_value=0, max_value=(1 << 63) - 1)
