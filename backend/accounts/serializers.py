from django.core.validators import (
    RegexValidator,
    EmailValidator,
    MinValueValidator,
    MinLengthValidator,
)
from rest_framework.serializers import (
    Serializer,
    ModelSerializer,
    CharField,
    ImageField,
)

from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
            "age",
            "gender",
            "phone_number",
            "avatar_url",
        )
        extra_kwargs = {
            "password": {
                "write_only": True,
                "validators": [
                    MinLengthValidator(8, "Password must be more than 7 characters."),
                    RegexValidator(
                        r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!\"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~])[A-Za-z0-9!\"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]+$",
                        "Password must contain upper/lowercase letters, digits and special characters.",
                    ),
                ],
            },
            "email": {"validators": [EmailValidator("Invalid email address.")]},
            "age": {"validators": [MinValueValidator(0, "Age cannot be negative.")]},
            "phone_number": {
                "validators": [
                    RegexValidator(r"^1[3456789]\d{9}$", "Invalid phone number.")
                ],
            },
            "avatar_url": {"read_only": True},
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


class UserUpdateSerializer(UserSerializer):
    """Same as UserSerializer, except that `username` and `password` are not required here."""

    username = CharField(max_length=150, required=False)
    password = CharField(max_length=128, required=False)

class AvatarUploadSerializer(Serializer):
    image = ImageField()
