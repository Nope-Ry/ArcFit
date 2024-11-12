from django.core.validators import RegexValidator, EmailValidator, MinValueValidator
from rest_framework.serializers import ModelSerializer, ValidationError

from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            "email": {"validators": [EmailValidator("Invalid email address.")]},
            "age": {"validators": [MinValueValidator(0, "Age cannot be negative.")]},
            "phone_number": {
                "validators": [RegexValidator(r"\d{11}", "Invalid phone number.")],
            },
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        if "password" in validated_data:
            instance.set_password(validated_data.pop("password"))

        for k, v in validated_data.items():
            setattr(instance, k, v)

        instance.save()
        return instance
