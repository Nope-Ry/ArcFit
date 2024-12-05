from django.urls import path

from .views import (
    user_register,
    user_login,
    user_update,
    user_logout,
    user_upload_avatar,
)

urlpatterns = [
    path("register", user_register),
    path("login", user_login),
    path("update", user_update),
    path("logout", user_logout),
    path("upload_avatar", user_upload_avatar),
]
