from django.contrib import admin

from .models import (
    Exercise,
    Muscle,
    Equipment,
    ExerciseMuscleRelationship,
    ExerciseEquipmentRelationship,
    MuscleEquipmentRelationship,
    TrainingSession
)

admin.site.register(Exercise)
admin.site.register(Muscle)
admin.site.register(Equipment)
admin.site.register(ExerciseMuscleRelationship)
admin.site.register(ExerciseEquipmentRelationship)
admin.site.register(MuscleEquipmentRelationship)
admin.site.register(TrainingSession)
