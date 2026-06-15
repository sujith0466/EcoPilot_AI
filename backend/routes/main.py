from flask import Blueprint
from services.health_service import get_health_status
from utils.response import success_response
from extensions import limiter

main_bp = Blueprint("main", __name__)


@main_bp.route("/")
def index():
    """Return API status."""
    return success_response(data={"service": "EcoPilot API"}, message="EcoPilot Backend is running")


@main_bp.route("/api/health", methods=["GET"])
@limiter.limit("10 per minute")
def health_check():
    """API endpoint to check application health."""
    health_data = get_health_status()
    return success_response(data=health_data, message="Application is healthy")

