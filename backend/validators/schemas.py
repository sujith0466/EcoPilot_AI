from marshmallow import Schema, fields, validate, EXCLUDE

class CarbonCalculationRequestSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    # Transportation
    transport_mode = fields.String(
        required=True,
        validate=validate.OneOf(
            ["walking", "bicycle", "motorcycle", "car", "bus", "train"]
        )
    )
    transport_distance = fields.Float(
        required=True,
        validate=validate.Range(min=0.0, max=100000.0)
    )
    transport_days = fields.Integer(
        required=True,
        validate=validate.Range(min=0, max=31)
    )

    # Electricity
    electricity_units = fields.Float(
        required=True,
        validate=validate.Range(min=0.0, max=5000.0)
    )

    # Food
    food_diet = fields.String(
        required=True,
        validate=validate.OneOf(["vegetarian", "mixed", "non-vegetarian"])
    )

    # Shopping
    shopping_tier = fields.String(
        required=True,
        validate=validate.OneOf(["low", "medium", "high"])
    )

    # Waste
    waste_tier = fields.String(
        required=True,
        validate=validate.OneOf(["low", "medium", "high"])
    )


class UserPreferencesSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    notifications_enabled = fields.Boolean(required=True)
    theme = fields.String(
        required=True,
        validate=validate.OneOf(["light", "dark", "system"])
    )
    currency = fields.String(
        required=False,
        validate=validate.Length(equal=3)
    )


class DashboardFiltersSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    date_range = fields.String(
        required=False,
        validate=validate.OneOf(["7d", "30d", "90d", "1y", "all"])
    )
    category = fields.String(
        required=False,
        validate=validate.OneOf(["transport", "energy", "food", "shopping", "waste", "all"])
    )
    limit = fields.Integer(
        required=False,
        validate=validate.Range(min=1, max=100)
    )
