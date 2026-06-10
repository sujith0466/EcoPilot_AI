from flask import Blueprint, request
from werkzeug.datastructures import MultiDict
from utils.response import success_response
from utils.errors import APIError
from validators.calculator import CalculatorForm
from extensions import limiter
from services.calculator_service import generate_footprint_report
from services.tracking_service import save_carbon_record
from utils.seed import seed_demo_user

calculator_bp = Blueprint("calculator", __name__)


@calculator_bp.route("/api/calculator/calculate", methods=["POST"])
@limiter.limit("100 per minute")
def calculate():
    """Endpoint to calculate carbon footprint."""
    data = request.get_json()
    if not data:
        raise APIError("No input data provided", status_code=400)

    form = CalculatorForm(formdata=MultiDict(data))
    if not form.validate():
        raise APIError(
            "Validation failed", status_code=400, payload={"errors": form.errors}
        )

    report = generate_footprint_report(form.data)

    # Save the record for the demo user
    user = seed_demo_user()
    save_carbon_record(user.id, report)

    return success_response(data=report, message="Calculation successful")

