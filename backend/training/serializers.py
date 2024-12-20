from jsonschema import ValidationError as JSONValidationError

from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    IntegerField,
    ValidationError,
)

from .models import Exercise, Muscle, Equipment, TrainingSession
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


class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = ["id", "name", "description", "steps", "img_path"]

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["m_id"] = rep.pop("id")

        rep["b_id"] = instance.targeted_muscles.all().values_list("id", flat=True)
        rep["e_id"] = instance.required_equipment.all().values_list("id", flat=True)
        return rep


class MuscleSerializer(ModelSerializer):
    class Meta:
        model = Muscle
        fields = ["id", "name", "description", "img_path"]

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["b_id"] = rep.pop("id")

        rep["m_id"] = instance.exercises.all().values_list("id", flat=True)
        rep["e_id"] = instance.required_equipment.all().values_list("id", flat=True)
        return rep


class EquipmentSerializer(ModelSerializer):
    class Meta:
        model = Equipment
        fields = ["id", "name", "description", "img_path"]

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["e_id"] = rep.pop("id")

        rep["m_id"] = instance.exercises.all().values_list("id", flat=True)
        return rep
