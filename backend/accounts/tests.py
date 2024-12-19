import os
import shutil
import io

from PIL import Image, ImageDraw

from django.test import Client, TestCase
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test.utils import override_settings

from knox.models import get_token_model

from .models import User
from .views import (
    user_register,
    user_login,
    user_update,
    user_logout,
    user_upload_avatar,
)


class AccountTestCase(TestCase):
    def setUp(self):
        # Create a temporary user for testing login
        user = User(
            username="testuser",
            first_name="test",
            last_name="user",
            phone_number="16645678901",
            age=20,
            gender=0,
            email="test@abc.com",
        )

        user.set_password("Mndhuh&#76512")
        user.save()

        self.client = Client()

    def test_register(self):
        # required fields missing
        REQUIRED_FIELD_MISSING_MSG = "This field is required."

        data = {}
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(
            json_data,
            {
                "username": [REQUIRED_FIELD_MISSING_MSG],
                "password": [REQUIRED_FIELD_MISSING_MSG],
            },
        )

        # required field blank
        REQUIRED_FIELD_BLANK_MSG = "This field may not be blank."
        data = {"username": "", "password": ""}
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(
            json_data,
            {
                "username": [REQUIRED_FIELD_BLANK_MSG],
                "password": [REQUIRED_FIELD_BLANK_MSG],
            },
        )

        # password too weak
        PASSWORD_TOO_SHORT_MSG = "Password must be more than 7 characters."
        PASSWORD_REQUIRED_CHARTYPE_MISSING_MSG = "Password must contain upper/lowercase letters, digits and special characters."
        data = {"username": "abcgd", "password": "67A8asd"}
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(
            json_data,
            {
                "password": [
                    PASSWORD_TOO_SHORT_MSG,
                    PASSWORD_REQUIRED_CHARTYPE_MISSING_MSG,
                ]
            },
        )

        data = {"username": "asdvcvv", "password": "Ahuds%Vasd"}
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(
            json_data, {"password": [PASSWORD_REQUIRED_CHARTYPE_MISSING_MSG]}
        )

        # string fields too long
        FIELD_TOO_LONG_FMT = "Ensure this field has no more than {} characters."
        data = {
            "username": "a" * 151,
            "password": "66ASD*&^as".ljust(151, "a"),
            "first_name": "c" * 151,
            "last_name": "d" * 151,
            "email": "@m.com".rjust(255, "e"),
        }
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(
            json_data,
            {
                "username": [FIELD_TOO_LONG_FMT.format(150)],
                "password": [FIELD_TOO_LONG_FMT.format(128)],
                "first_name": [FIELD_TOO_LONG_FMT.format(150)],
                "last_name": [FIELD_TOO_LONG_FMT.format(150)],
                "email": [FIELD_TOO_LONG_FMT.format(254)],
            },
        )

        # invalid email
        INVALID_EMAIL_MSG = "Invalid email address.|Enter a valid email address."
        data = {
            "username": "usss",
            "password": "78612HHasxd*((&))",
            "email": "jasxpop2dd",
        }
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(json_data, {"email": INVALID_EMAIL_MSG.split("|")})

        # invalid age
        NOT_INTEGER_MSG = "A valid integer is required."
        data = {
            "username": "xxxjx",
            "password": "e83988u3HGH7!",
            "age": "asdbwf",
        }
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(json_data, {"age": [NOT_INTEGER_MSG]})

        NEGATIVE_AGE_MSG = "Age cannot be negative."
        data = {
            "username": "xxxjx",
            "password": "*&^hasdasuhHGG777",
            "age": -1,
        }
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(json_data, {"age": [NEGATIVE_AGE_MSG]})

        # invalid gender option
        INVALID_OPTION_FMT = '"{}" is not a valid choice.'
        data = {
            "username": "xxxjx",
            "password": "iuhIUYAG889^",
            "gender": 3,
        }
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(json_data, {"gender": [INVALID_OPTION_FMT.format("3")]})

        # invalid phone number
        INVALID_PHONE_NUMBER_MSG = "Invalid phone number."
        data = {
            "username": "xxxjx",
            "password": "iuhIUYAG889^",
            "phone_number": "66811234320",
        }
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(json_data, {"phone_number": [INVALID_PHONE_NUMBER_MSG]})

        # manipulate unexposed fields
        data = {
            "username": "abcde",
            "password": "Abcx674*h&ah",
            "is_superuser": True,
            "is_staff": True,
            "is_active": False,
        }
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        queryset = User.objects.filter(username="abcde")
        self.assertEqual(queryset.count(), 1)
        user = queryset.first()
        assert user is not None
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_staff)
        self.assertTrue(user.is_active)

        # username collision
        USERNAME_COLLISION_MSG = "A user with that username already exists."
        data = {
            "username": "abcde",
            "password": "asd33aFGfew*",
        }
        response = self.client.post(
            reverse(user_register), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(json_data, {"username": [USERNAME_COLLISION_MSG]})

    def test_login_and_logout(self):
        # wrong username or password
        LOGIN_FAILED_MSG = "Invalid username or password."
        data = {"username": "testuser", "password": "aas87y123gd"}
        response = self.client.post(
            reverse(user_login), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertDictEqual(json_data, {"error": LOGIN_FAILED_MSG})

        # successful login
        data = {"username": "testuser", "password": "Mndhuh&#76512"}
        response = self.client.post(
            reverse(user_login), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        json_data = response.json()
        self.assertSetEqual(set(json_data.keys()), {"expiry", "token", "user"})
        self.assertRegex(
            json_data["expiry"], r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$"
        )
        self.assertRegex(json_data["token"], r"^[0-9a-f]{64}$")
        self.assertSetEqual(
            set(json_data["user"].keys()),
            {
                "username",
                "first_name",
                "last_name",
                "email",
                "age",
                "gender",
                "phone_number",
                "avatar_url",
            },
        )

        token = json_data["token"]

        # unauthorized logout
        response = self.client.post(
            reverse(user_logout), data={}, content_type="application/json"
        )
        self.assertEqual(response.status_code, 401)

        # normal logout
        response = self.client.post(
            reverse(user_logout),
            data={},
            content_type="application/json",
            headers={"Authorization": f"Token {token}"},
        )
        self.assertEqual(response.status_code, 200)
        json_data = response.json()
        self.assertDictEqual(json_data, {})

        # token used after logout
        response = self.client.post(
            reverse(user_logout),
            data={},
            content_type="application/json",
            headers={"Authorization": f"Token {token}"},
        )
        self.assertEqual(response.status_code, 401)

    def test_update(self):
        # unauthorized update
        response = self.client.post(
            reverse(user_update), data={}, content_type="application/json"
        )
        self.assertEqual(response.status_code, 401)

        # login
        data = {"username": "testuser", "password": "Mndhuh&#76512"}
        response = self.client.post(
            reverse(user_login), data=data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        json_data = response.json()
        token = json_data["token"]

        # invalid data
        response = self.client.post(
            reverse(user_update),
            data={"age": -20},
            content_type="application/json",
            headers={"Authorization": f"Token {token}"},
        )
        self.assertEqual(response.status_code, 400)

        # allow no-op (all fields optional)
        response = self.client.post(
            reverse(user_update),
            data={},
            content_type="application/json",
            headers={"Authorization": f"Token {token}"},
        )
        self.assertEqual(response.status_code, 200)

        # change personal information
        data = {
            "first_name": "hello",
            "last_name": "world",
            "email": "hello@abc.com",
            "age": 18,
            "gender": 1,
            "phone_number": "15576653524",
        }
        response = self.client.post(
            reverse(user_update),
            data=data,
            content_type="application/json",
            headers={"Authorization": f"Token {token}"},
        )
        self.assertEqual(response.status_code, 200)
        queryset = User.objects.filter(username="testuser")
        self.assertEqual(queryset.count(), 1)
        user = queryset.first()
        assert user is not None
        self.assertEqual(user.first_name, "hello")
        self.assertEqual(user.last_name, "world")
        self.assertEqual(user.email, "hello@abc.com")
        self.assertEqual(user.age, 18)
        self.assertEqual(user.gender, 1)
        self.assertEqual(user.phone_number, "15576653524")

        # logout
        response = self.client.post(
            reverse(user_logout),
            data={},
            content_type="application/json",
            headers={"Authorization": f"Token {token}"},
        )
        self.assertEqual(response.status_code, 200)


@override_settings(UPLOAD_AVATAR_PATH="test_static", MAX_AVATAR_SIZE=10 * 1024)
class UploadImageTestCase(TestCase):
    def create_test_image(self, size, xy):
        # Create a temporary image for upload
        image = Image.new("RGB", size, color="white")
        draw = ImageDraw.Draw(image)
        draw.rectangle(xy, outline="red", fill="blue")
        image_buf = io.BytesIO()
        image.save(image_buf, format="JPEG")
        return image_buf.getvalue()

    def setUp(self):
        # Create user
        self.client = Client()
        self.user = User.objects.create_user(username="user", password="password")

        # Generate tokens for authentication
        TokenModel = get_token_model()
        _, self.token = TokenModel.objects.create(user=self.user)  # type: ignore

        # Base headers for authentication
        self.auth_headers = {"AUTHORIZATION": f"Token {self.token}"}

        # Create images
        self.small_image = SimpleUploadedFile(
            name="small_image.jpg",
            content=self.create_test_image((100, 100), (30, 50, 40, 80)),
            content_type="image/jpeg",
        )
        self.small_image2 = SimpleUploadedFile(
            name="small_image2.jpg",
            content=self.create_test_image((100, 100), (30, 50, 40, 80)),
            content_type="image/jpeg",
        )
        self.large_image = SimpleUploadedFile(
            name="large_image.jpg",
            content=self.create_test_image((3000, 3000), (400, 700, 600, 1200)),
            content_type="image/jpeg",
        )
        self.invalid_image = SimpleUploadedFile(
            name="invalid_image.txt",
            content=b"This is not an image",
            content_type="text/plain",
        )

    def test_upload_small_image(self):
        response = self.client.post(
            reverse(user_upload_avatar),
            data={"image": self.small_image},
            headers=self.auth_headers,
        )
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertSetEqual(set(data.keys()), {"avatar_url"})
        self.assertTrue(data["avatar_url"].startswith("test_static"))
        self.assertTrue(data["avatar_url"].endswith(".jpeg"))

        # Update user's avatar
        response = self.client.post(
            reverse(user_upload_avatar),
            data={"image": self.small_image2},
            headers=self.auth_headers,
        )
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertSetEqual(set(data.keys()), {"avatar_url"})
        self.assertTrue(data["avatar_url"].startswith("test_static"))
        self.assertTrue(data["avatar_url"].endswith(".jpeg"))

    def test_upload_large_image(self):
        response = self.client.post(
            reverse(user_upload_avatar),
            data={"image": self.large_image},
            headers=self.auth_headers,
        )
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertEqual(data, {"error": "Image file is too large."})

    def test_upload_invalid_image(self):
        response = self.client.post(
            reverse(user_upload_avatar),
            data={"image": self.invalid_image},
            headers=self.auth_headers,
        )
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertIn("image", data)

    def tearDown(self):
        if os.path.exists("test_static"):
            shutil.rmtree("test_static")
