from jsonschema.validators import Draft202012Validator

VALIDATOR = Draft202012Validator(
    {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "m_id": {
                    "type": "integer",
                },
                "group": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "reps": {
                                "type": "integer",
                                "minimum": 0,
                            },
                            "weight": {
                                "type": "integer",
                                "minimum": 0,
                            },
                        },
                        "required": ["reps", "weight"],
                    },
                    "minItems": 1,
                },
                "rating": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 5,
                },
            },
            "required": ["m_id", "group", "rating"],
        },
        "minItems": 1,
    }
)
