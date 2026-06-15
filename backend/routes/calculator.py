from flask import Blueprint, request, Response
from utils.response import success_response
from utils.errors import APIError
from marshmallow import ValidationError
from validators.schemas import CarbonCalculationRequestSchema
from extensions import limiter, cache
from services.calculator_service import generate_footprint_report
from services.tracking_service import save_carbon_record
from utils.seed import seed_demo_user

calculator_bp = Blueprint("calculator", __name__)


@calculator_bp.route("/api/calculator/calculate", methods=["POST"])
@limiter.limit("300 per hour")
def calculate() -> Response:
    """Endpoint to calculate carbon footprint."""
    data = request.get_json()
    if not data:
        raise APIError("No input data provided", status_code=400)

    schema = CarbonCalculationRequestSchema()
    try:
        validated_data = schema.load(data)
    except ValidationError as err:
        raise APIError(
            "Validation failed", status_code=400, payload={"errors": err.messages}
        )

    report = generate_footprint_report(validated_data)

    # Save the record for the demo user
    user = seed_demo_user()
    save_carbon_record(user.id, report)
    
    # Smart Cache Invalidation
    cache.delete('dashboard_data_demo_user')

    return success_response(data=report, message="Calculation successful")

