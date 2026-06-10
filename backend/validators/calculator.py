from wtforms import Form, FloatField, IntegerField, StringField, validators


class CalculatorForm(Form):
    # Transportation
    transport_mode = StringField(
        "Transport Mode",
        [
            validators.DataRequired(),
            validators.AnyOf(
                ["walking", "bicycle", "motorcycle", "car", "bus", "train"]
            ),
        ],
    )
    transport_distance = FloatField(
        "Distance per day",
        [validators.InputRequired(), validators.NumberRange(min=0.0, max=500.0)],
    )
    transport_days = IntegerField(
        "Days per month",
        [validators.InputRequired(), validators.NumberRange(min=0, max=31)],
    )

    # Electricity
    electricity_units = FloatField(
        "Monthly units consumed",
        [validators.InputRequired(), validators.NumberRange(min=0.0, max=5000.0)],
    )

    # Food
    food_diet = StringField(
        "Diet type",
        [
            validators.DataRequired(),
            validators.AnyOf(["vegetarian", "mixed", "non-vegetarian"]),
        ],
    )

    # Shopping
    shopping_tier = StringField(
        "Shopping tier",
        [validators.DataRequired(), validators.AnyOf(["low", "medium", "high"])],
    )

    # Waste
    waste_tier = StringField(
        "Waste tier",
        [validators.DataRequired(), validators.AnyOf(["low", "medium", "high"])],
    )

