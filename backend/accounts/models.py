from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True)
    age = models.IntegerField(default=-1)

    gender_choices = ((0, "male"), (1, "female"), (2, "unknown"))
    gender = models.SmallIntegerField(choices=gender_choices, default=2)

    avatar_url = models.CharField(max_length=128, default="")
