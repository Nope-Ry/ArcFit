from django.test import Client, TestCase
from django.urls import reverse
from django.utils.timezone import now, timedelta

from .models import Asset
from .views import get_asset_metadata


class GetAssetMetadataTestCase(TestCase):
    def setUp(self):
        """
        Set up initial data for testing.
        """
        self.client = Client()

        # Create some assets
        self.asset1 = Asset.objects.create(
            asset_id="image1",
            version="1.0",
            url="https://example.com/image1.jpg",
            updated_at=now() - timedelta(days=5),
        )
        self.asset2 = Asset.objects.create(
            asset_id="image2",
            version="2.0",
            url="https://example.com/image2.jpg",
            updated_at=now() - timedelta(days=2),
        )
        self.asset3 = Asset.objects.create(
            asset_id="image3",
            version="1.1",
            url="https://example.com/image3.jpg",
            updated_at=now(),
        )

    def test_get_all_assets(self):
        """
        Test retrieving all assets without the `updated_since` parameter.
        """
        response = self.client.get(reverse(get_asset_metadata))
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(len(data), 3)  # All assets should be returned

        asset_ids = [asset["asset_id"] for asset in data]
        self.assertIn("image1", asset_ids)
        self.assertIn("image2", asset_ids)
        self.assertIn("image3", asset_ids)

    def test_get_updated_assets(self):
        """
        Test retrieving assets updated since a specific timestamp.
        """
        # 3 days ago
        updated_since = (now() - timedelta(days=3)).isoformat()
        response = self.client.get(
            reverse(get_asset_metadata), query_params={"updated_since": updated_since}  # type: ignore
        )
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(len(data), 2) # Only image2 and image3

        asset_ids = [asset["asset_id"] for asset in data]
        self.assertIn("image2", asset_ids)
        self.assertIn("image3", asset_ids)
        self.assertNotIn("image1", asset_ids)

    def test_invalid_updated_since(self):
        """
        Test handling of invalid `updated_since` parameter.
        """
        response = self.client.get(
            reverse(get_asset_metadata), query_params={"updated_since": "asoiuiwdh8"}  # type: ignore
        )
        self.assertEqual(response.status_code, 400)

        data = response.json()
        self.assertIn("error", data)
        self.assertEqual(data["error"], "Invalid timestamp.")

    def test_empty_response_for_future_date(self):
        """
        Test retrieving assets with a future `updated_since` timestamp.
        """
        # 1 day in the future
        future_date = (now() + timedelta(days=1)).isoformat()

        # Send the request
        response = self.client.get(
            reverse(get_asset_metadata), query_params={"updated_since": future_date}  # type: ignore
        )
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(len(data), 0)
