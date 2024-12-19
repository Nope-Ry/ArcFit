import os

from django.contrib.auth import authenticate
from django.utils import timezone
from django.conf import settings
from django.utils.crypto import get_random_string
from django_ratelimit.decorators import ratelimit

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.serializers import DateTimeField
from rest_framework.permissions import IsAuthenticated
from knox.settings import knox_settings
from knox.models import get_token_model
from knox.auth import TokenAuthentication

from utils.decorators import json_request

from .serializers import UserSerializer, UserUpdateSerializer, AvatarUploadSerializer


@api_view(["POST"])
@json_request
def user_register(request, json_data):
    """Register a new user."""
    serializer = UserSerializer(data=json_data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response({}, status=HTTP_200_OK)


@ratelimit(key="ip", rate="10/m", block=True)
@api_view(["POST"])
@json_request
def user_login(request, json_data):
    """Try to login with given username and password. Return a access token on success."""
    username = json_data.get("username", None)
    password = json_data.get("password", None)

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {"error": "Invalid username or password."}, status=HTTP_400_BAD_REQUEST
        )

    if not user.is_active:
        return Response({"error": "User isn't activated."}, status=HTTP_400_BAD_REQUEST)

    token_limit_per_user = knox_settings.TOKEN_LIMIT_PER_USER
    if token_limit_per_user is not None:
        now = timezone.now()
        token = user.auth_token_set.filter(expiry__gt=now)  # type: ignore
        if token.count() >= token_limit_per_user:
            return Response(
                {"error": "Maximum amount of tokens allowed per user exceeded."},
                status=HTTP_400_BAD_REQUEST,
            )

    instance, token = get_token_model().objects.create(user=user, expiry=knox_settings.TOKEN_TTL)  # type: ignore

    return Response(
        {
            "expiry": DateTimeField(
                format=knox_settings.EXPIRY_DATETIME_FORMAT  # type: ignore
            ).to_representation(instance.expiry),
            "token": token,
            "user": UserSerializer(user).data,
        },
        status=HTTP_200_OK,
    )


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@json_request
def user_update(request, json_data):
    """Update user information. Only accessible to authenticated users."""
    serializer = UserUpdateSerializer(instance=request.user, data=json_data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response(UserSerializer(request.user).data, status=HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_logout(request):
    """Invalidate current token."""
    request.auth.delete()

    return Response({}, status=HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_upload_avatar(request):
    """Uploads an avatar."""
    serializer = AvatarUploadSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    image = serializer.validated_data["image"]  # type: ignore

    max_file_size = getattr(
        settings, "MAX_AVATAR_SIZE", 10 * 1024 * 1024
    )  # 10MB in bytes
    if image.size > max_file_size:
        return Response(
            {"error": "Image file is too large."}, status=HTTP_400_BAD_REQUEST
        )

    upload_path = getattr(settings, "UPLOAD_AVATAR_PATH", "static")
    os.makedirs(upload_path, exist_ok=True)

    ext = image.content_type.split("/")[-1]

    user = request.user
    file_name = f"{user.id}-{get_random_string(length=12)}.{ext}"
    file_path = os.path.join(upload_path, file_name)

    with open(file_path, "wb+") as f:
        for chunk in image.chunks():
            f.write(chunk)

    def is_under_path(path, parent_path):
        path, parent_path = os.path.abspath(path), os.path.abspath(parent_path)
        return path.startswith(parent_path)

    if (
        user.avatar_url
        and is_under_path(user.avatar_url, upload_path)
        and os.path.exists(user.avatar_url)
    ):
        os.remove(user.avatar_url)

    user = request.user
    user.avatar_url = file_path
    user.save()

    return Response({"avatar_url": file_path}, status=HTTP_201_CREATED)
