from django.contrib.auth import authenticate
from django.utils import timezone

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.serializers import DateTimeField
from rest_framework.permissions import IsAuthenticated
from knox.settings import knox_settings
from knox.models import get_token_model
from knox.auth import TokenAuthentication

from utils.decorators import json_request

from .serializers import UserSerializer, UserUpdateSerializer


@api_view(["POST"])
@json_request
def user_register(request, json_data):
    """Register a new user."""
    serializer = UserSerializer(data=json_data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response({}, status=HTTP_200_OK)


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
            "user": UserSerializer(user).data
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
    return Response({}, status=HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_logout(request):
    """Invalidate current token."""
    request.auth.delete()

    return Response({}, status=HTTP_200_OK)
