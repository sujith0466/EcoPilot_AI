from flask import Blueprint, request
import html
from utils.response import success_response
from utils.seed import seed_demo_user
from services.tracking_service import get_user_history
from services.analytics_service import generate_analytics_summary
from services.recommendation_service import generate_recommendations
from services.ai_coach_service import generate_ai_coach_data
from services.gamification_service import (
    generate_gamification_data,
    create_goal,
)
from extensions import limiter, cache

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/api/dashboard/data", methods=["GET"])
@limiter.limit("30 per minute")
@cache.cached(timeout=60, key_prefix='dashboard_data_demo_user')
def get_dashboard_data():
    """Retrieve full dashboard data for the demo user."""
    # Hardcoded demo user for Phase 3 (authentication excluded from scope)
    user = seed_demo_user()

    history = get_user_history(user.id)
    # Passed history directly, bypassing 3 redundant db queries
    analytics = generate_analytics_summary(history)

    recommendations = generate_recommendations(history)
    gamification = generate_gamification_data(user.id, history)
    ai_coach = generate_ai_coach_data(history, analytics, recommendations, gamification)

    latest_record = history[0] if history else None

    data = {
        "user_id": user.id,
        "username": user.username,
        "latest_record": latest_record,
        "history": history,
        "analytics": analytics,
        "recommendations": recommendations,
        "gamification": gamification,
        "ai_coach": ai_coach,
    }

    return success_response(data=data, message="Dashboard data retrieved successfully")


@dashboard_bp.route("/api/goals", methods=["POST"])
@limiter.limit("10 per minute")
def add_goal():
    user = seed_demo_user()
    data = request.get_json()
    title = html.escape(str(data.get("title", "New Goal")))
    desc = html.escape(str(data.get("description", "")))
    target = data.get("target_value", 10.0)

    goal = create_goal(user.id, title, desc, target)
    return success_response(data=goal, message="Goal created")

