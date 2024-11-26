from rest_framework.decorators import api_view

from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
)

from django.utils.dateparse import parse_datetime
from .models import Asset


@api_view(["GET"])
def get_asset_metadata(request):
    """
    Fetch metadata for assets. If 'updated_since' is provided, return only updated assets.
    """
    updated_since = request.GET.get("updated_since", None)

    if updated_since:
        try:
            updated_since = parse_datetime(updated_since)
            assert updated_since is not None
        except (ValueError, AssertionError):
            return Response(
                {"error": "Invalid timestamp."}, status=HTTP_400_BAD_REQUEST
            )

        # Ensure the timestamp is timezone-aware (if not, convert it)
        if updated_since.tzinfo is None:
            from django.utils.timezone import make_aware
            updated_since = make_aware(updated_since)

        assets = Asset.objects.filter(updated_at__gt=updated_since)
    else:
        assets = Asset.objects.all()

    asset_list = [
        {
            "asset_id": asset.asset_id,
            "version": asset.version,
            "path": asset.path,
            "updated_at": asset.updated_at.isoformat(),
        }
        for asset in assets
    ]

    return Response(asset_list, status=HTTP_200_OK)
