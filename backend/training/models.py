from django.db import models


class Exercise(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()
    steps = models.JSONField(default=list)
    img_path = models.CharField(max_length=128)

    def __str__(self) -> str:
        return f"Exercise {self.name}"


class Muscle(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()
    img_path = models.CharField(max_length=128)

    exercises = models.ManyToManyField(
        Exercise, related_name="targeted_muscles", through="ExerciseMuscleRelationship"
    )

    def __str__(self) -> str:
        return f"Muscle {self.name}"


class Equipment(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    img_path = models.CharField(max_length=128)

    exercises = models.ManyToManyField(
        Exercise,
        related_name="required_equipment",
        through="ExerciseEquipmentRelationship",
    )
    muscles = models.ManyToManyField(
        Muscle, related_name="required_equipment", through="MuscleEquipmentRelationship"
    )

    def __str__(self) -> str:
        return f"Equipment {self.name}"


class ExerciseMuscleRelationship(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    muscle = models.ForeignKey(Muscle, on_delete=models.CASCADE)


class ExerciseEquipmentRelationship(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)


class MuscleEquipmentRelationship(models.Model):
    muscle = models.ForeignKey(Muscle, on_delete=models.CASCADE)
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)


class TrainingSession(models.Model):
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    duration_seconds = models.PositiveIntegerField()
    records = models.JSONField()

    def __str__(self):
        return f"Session by {self.user} on {self.start_time}"
