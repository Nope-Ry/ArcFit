from django.test import Client, TestCase
from django.urls import reverse
from django.utils.timezone import now, timedelta

from knox.models import get_token_model

from accounts.models import User
from .models import (
    Exercise,
    TrainingSession,
    Muscle,
    Equipment,
    ExerciseEquipmentRelationship,
    ExerciseMuscleRelationship,
    MuscleEquipmentRelationship,
)


class TrainingSessionViewTests(TestCase):
    def setUp(self):
        # Create two users
        self.client = Client()
        self.user1 = User.objects.create_user(username="user1", password="password1")
        self.user2 = User.objects.create_user(username="user2", password="password2")

        # Generate tokens for authentication
        TokenModel = get_token_model()
        _, self.token1 = TokenModel.objects.create(user=self.user1)  # type: ignore
        _, self.token2 = TokenModel.objects.create(user=self.user2)  # type: ignore

        # Base headers for authentication
        self.auth_headers1 = {"AUTHORIZATION": f"Token {self.token1}"}
        self.auth_headers2 = {"AUTHORIZATION": f"Token {self.token2}"}

        # Create 4 types of exercise
        Exercise.objects.create(id=10001, name="Exercise1")
        Exercise.objects.create(id=10002, name="Exercise2")
        Exercise.objects.create(id=10003, name="Exercise3")
        Exercise.objects.create(id=10004, name="Exercise4")

        # Create sample sessions for each user
        self.base_time = now()
        self.user1_session1 = TrainingSession.objects.create(
            user=self.user1,
            start_time=self.base_time - timedelta(days=1),
            duration_seconds=3600,
            records=[
                {
                    "m_id": 10001,
                    "group": [{"reps": 30980766, "weight": 73744354}],
                    "rating": 3,
                },
                {
                    "m_id": 10002,
                    "group": [{"reps": 64547283, "weight": 91333726}],
                    "rating": 5,
                },
            ],
        )

        self.user1_session2 = TrainingSession.objects.create(
            user=self.user1,
            start_time=self.base_time - timedelta(days=2),
            duration_seconds=1800,
            records=[
                {
                    "m_id": 10003,
                    "group": [{"reps": 68655305, "weight": 28062375}],
                    "rating": 1,
                }
            ],
        )

        self.user2_session1 = TrainingSession.objects.create(
            user=self.user2,
            start_time=self.base_time - timedelta(days=5),
            duration_seconds=2700,
            records=[
                {
                    "m_id": 10004,
                    "group": [{"reps": 36350059, "weight": 48716487}],
                    "rating": 2,
                },
                {
                    "m_id": 10003,
                    "group": [
                        {"reps": 18233579, "weight": 646930},
                        {"reps": 40887216, "weight": 14173165},
                    ],
                    "rating": 1,
                },
            ],
        )

        self.user2_session2 = TrainingSession.objects.create(
            user=self.user2,
            start_time=self.base_time - timedelta(days=10),
            duration_seconds=5400,
            records=[
                {
                    "m_id": 10002,
                    "group": [
                        {"reps": 62138460, "weight": 68996247},
                        {"reps": 46661786, "weight": 40812739},
                    ],
                    "rating": 4,
                },
                {
                    "m_id": 10004,
                    "group": [
                        {"reps": 68149268, "weight": 7810620},
                        {"reps": 47044835, "weight": 84242580},
                        {"reps": 20167274, "weight": 15860626},
                    ],
                    "rating": 1,
                },
                {
                    "m_id": 10001,
                    "group": [
                        {"reps": 3598076, "weight": 47307891},
                        {"reps": 61597084, "weight": 61017197},
                        {"reps": 38610010, "weight": 38323576},
                    ],
                    "rating": 3,
                },
            ],
        )

    def test_list_sessions(self):
        # List all training sessions
        response = self.client.get(
            reverse("trainingsession_list"), headers=self.auth_headers1
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]["id"], self.user1_session1.id)  # type: ignore
        self.assertEqual(data[1]["id"], self.user1_session2.id)  # type: ignore

        response = self.client.get(
            reverse("trainingsession_list"), headers=self.auth_headers2
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), 2)
        data = response.json()
        self.assertEqual(data[0]["id"], self.user2_session1.id)  # type: ignore
        self.assertEqual(data[1]["id"], self.user2_session2.id)  # type: ignore

        # With params
        query_params = {"start_time": self.base_time.isoformat()}
        response = self.client.get(
            reverse("trainingsession_list"),
            query_params=query_params,  # type: ignore
            headers=self.auth_headers1,
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 0)

        query_params = {
            "start_time": (self.base_time - timedelta(days=1, hours=12)).isoformat()
        }
        response = self.client.get(
            reverse("trainingsession_list"),
            query_params=query_params,  # type: ignore
            headers=self.auth_headers1,
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["id"], self.user1_session1.id)  # type: ignore

        query_params = {"end_time": (self.base_time - timedelta(days=7)).isoformat()}
        response = self.client.get(
            reverse("trainingsession_list"),
            query_params=query_params,  # type: ignore
            headers=self.auth_headers2,
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["id"], self.user2_session2.id)  # type: ignore

        query_params = {
            "start_time": (self.base_time - timedelta(days=9)).isoformat(),
            "end_time": (self.base_time - timedelta(days=7)).isoformat(),
        }
        response = self.client.get(
            reverse("trainingsession_list"),
            query_params=query_params,  # type: ignore
            headers=self.auth_headers2,
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 0)

    def test_create_session(self):
        # Records field is invalid under given schema
        data = {
            "start_time": (self.base_time - timedelta(hours=2)).isoformat(),
            "duration_seconds": 3000,
            "records": [
                {
                    "m_id": 10001,
                    "group": [
                        {"reps": 9023710},
                    ],
                    "rating": 5,
                }
            ],
        }

        response = self.client.post(
            reverse("trainingsession_create"),
            data,
            headers=self.auth_headers1,
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertEqual(
            data, {"records": ["Invalid records: 'weight' is a required property"]}
        )

        # Records field includes non-existent exercise id
        data = {
            "start_time": (self.base_time - timedelta(hours=2)).isoformat(),
            "duration_seconds": 3000,
            "records": [
                {
                    "m_id": 1234,
                    "group": [
                        {"reps": 9023710, "weight": 65679398},
                        {"reps": 86900215, "weight": 57983707},
                        {"reps": 48964527, "weight": 44605417},
                    ],
                    "rating": 5,
                }
            ],
        }

        response = self.client.post(
            reverse("trainingsession_create"),
            data,
            headers=self.auth_headers1,
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertEqual(
            data, {"records": ["Invalid records: invalid exercise id found."]}
        )

        # Successful creation
        start_time = (self.base_time - timedelta(hours=2)).isoformat()
        data = {
            "start_time": start_time,
            "duration_seconds": 3000,
            "records": [
                {
                    "m_id": 10003,
                    "group": [
                        {"reps": 9023710, "weight": 65679398},
                        {"reps": 86900215, "weight": 57983707},
                        {"reps": 48964527, "weight": 44605417},
                    ],
                    "rating": 5,
                }
            ],
        }

        response = self.client.post(
            reverse("trainingsession_create"),
            data,
            headers=self.auth_headers1,
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        data = response.json()
        queryset = TrainingSession.objects.filter(
            user=self.user1,
            start_time=start_time,
        )
        self.assertEqual(queryset.count(), 1)
        self.assertEqual(data["id"], queryset.first().id)  # type: ignore

    def test_bulk_delete_sessions(self):
        # User1 tries to delete non-existent sessions
        data = {"ids": [999]}
        response = self.client.delete(
            reverse("trainingsession_delete"),
            data,
            content_type="application/json",
            headers=self.auth_headers1,
        )
        self.assertEqual(response.status_code, 204)
        # Verify User1's valid sessions are still present
        self.assertEqual(TrainingSession.objects.filter(user=self.user1).count(), 2)

        # User1 tries to delete their own session
        data = {"ids": [self.user1_session1.id]}  # type: ignore
        response = self.client.delete(
            reverse("trainingsession_delete"),
            data,
            content_type="application/json",
            headers=self.auth_headers1,
        )
        self.assertEqual(response.status_code, 204)
        self.assertFalse(
            TrainingSession.objects.filter(id=self.user1_session1.id).exists()  # type: ignore
        )

        # User1 tries to delete User2's session (shouldn't be possible)
        data = {"ids": [self.user2_session1.id]}  # type: ignore
        response = self.client.delete(
            reverse("trainingsession_delete"),
            data,
            content_type="application/json",
            headers=self.auth_headers1,
        )
        self.assertEqual(response.status_code, 204)
        # Verify nothing is deleted
        self.assertEqual(TrainingSession.objects.filter(user=self.user2).count(), 2)


class GetStaticDataViewTests(TestCase):
    def setUp(self):
        # Add sample data: 3 exercises, 3 muscles, 2 equipments
        Exercise.objects.create(
            id=10001,
            name="Exercise1",
            description="ExDesc1",
            steps=["ExStep1", "ExStep2"],
            img_path="ExPath1",
        )
        Exercise.objects.create(
            id=10002,
            name="Exercise2",
            description="ExDesc2",
            steps=["ExStep1", "ExStep2"],
            img_path="ExPath2",
        )
        Exercise.objects.create(
            id=10003,
            name="Exercise3",
            description="ExDesc3",
            steps=["ExStep1", "ExStep2"],
            img_path="ExPath3",
        )

        Muscle.objects.create(
            id=10001,
            name="Muscle1",
            description="MDesc1",
            img_path="MPath1",
        )
        Muscle.objects.create(
            id=10002,
            name="Muscle2",
            description="MDesc2",
            img_path="MPath2",
        )
        Muscle.objects.create(
            id=10003,
            name="Muscle3",
            description="MDesc3",
            img_path="MPath3",
        )

        Equipment.objects.create(
            id=10001,
            name="Equipment1",
            description="EqDesc1",
            img_path="EqPath1",
        )
        Equipment.objects.create(
            id=10002,
            name="Equipment2",
            description="EqDesc2",
            img_path="EqPath2",
        )

        ExerciseMuscleRelationship.objects.create(
            exercise_id=10001, muscle_id=10001
        )
        ExerciseMuscleRelationship.objects.create(
            exercise_id=10001, muscle_id=10002
        )
        ExerciseMuscleRelationship.objects.create(
            exercise_id=10002, muscle_id=10003
        )
        ExerciseMuscleRelationship.objects.create(
            exercise_id=10003, muscle_id=10001
        )

        ExerciseEquipmentRelationship.objects.create(
            exercise_id=10001, equipment_id=10002
        )
        ExerciseEquipmentRelationship.objects.create(
            exercise_id=10002, equipment_id=10001
        )
        ExerciseEquipmentRelationship.objects.create(
            exercise_id=10003, equipment_id=10002
        )

        MuscleEquipmentRelationship.objects.create(
            muscle_id=10001, equipment_id=10001
        )
        MuscleEquipmentRelationship.objects.create(
            muscle_id=10001, equipment_id=10002
        )
        MuscleEquipmentRelationship.objects.create(
            muscle_id=10003, equipment_id=10002
        )

    def test_get_exercise_list(self):
        response = self.client.get(reverse("get_exercise_list"))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 3)

        self.assertEqual(data[0], {
            "m_id": 10001,
            "name": "Exercise1",
            "description": "ExDesc1",
            "steps": ["ExStep1", "ExStep2"],
            "img_path": "ExPath1",
            "b_id": [10001, 10002],
            "e_id": [10002],
        })
        
        self.assertEqual(data[1], {
            "m_id": 10002,
            "name": "Exercise2",
            "description": "ExDesc2",
            "steps": ["ExStep1", "ExStep2"],
            "img_path": "ExPath2",
            "b_id": [10003],
            "e_id": [10001],
        })

        self.assertEqual(data[2], {
            "m_id": 10003,
            "name": "Exercise3",
            "description": "ExDesc3",
            "steps": ["ExStep1", "ExStep2"],
            "img_path": "ExPath3",
            "b_id": [10001],
            "e_id": [10002],
        })

    def test_get_muscle_list(self):
        response = self.client.get(reverse("get_muscle_list"))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 3)
        
        self.assertEqual(data[0], {
            "b_id": 10001,
            "name": "Muscle1",
            "description": "MDesc1",
            "img_path": "MPath1",
            "m_id": [10001, 10003],
            "e_id": [10001, 10002],
        })
        
        self.assertEqual(data[1], {
            "b_id": 10002,
            "name": "Muscle2",
            "description": "MDesc2",
            "img_path": "MPath2",
            "m_id": [10001],
            "e_id": [],
        })

        self.assertEqual(data[2], {
            "b_id": 10003,
            "name": "Muscle3",
            "description": "MDesc3",
            "img_path": "MPath3",
            "m_id": [10002],
            "e_id": [10002],
        })

    def test_get_equipment_list(self):
        response = self.client.get(reverse("get_equipment_list"))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 2)
        
        self.assertEqual(data[0], {
            "e_id": 10001,
            "name": "Equipment1",
            "description": "EqDesc1",
            "img_path": "EqPath1",
            "m_id": [10002],
        })
        
        self.assertEqual(data[1], {
            "e_id": 10002,
            "name": "Equipment2",
            "description": "EqDesc2",
            "img_path": "EqPath2",
            "m_id": [10001, 10003],
        })
