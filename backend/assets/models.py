from django.db import models


class Asset(models.Model):
    asset_id = models.CharField(max_length=255, primary_key=True)
    version = models.CharField(max_length=50)
    path = models.CharField(max_length=128)
    updated_at = models.DateTimeField()

    def __str__(self):
        return f"{self.asset_id} (v{self.version}): last update {self.updated_at}"