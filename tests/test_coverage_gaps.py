import pytest
from flask import json
import os

from app import create_app
from services.gamification_service import generate_gamification_data
from services.tracking_service import save_carbon_record, get_user_history
from utils.seed import seed_demo_user
from utils.coach_context_builder import build_coach_context
from utils.insight_generator import generate_insights
from utils.prompt_builder import build_prompt
from services.recommendation_service import generate_recommendations
from utils.errors import APIError
from config import ProductionConfig
from utils.logger import setup_logger

def test_production_config_fail_fast(monkeypatch):
    monkeypatch.delenv("SECRET_KEY", raising=False)
    app = create_app("testing") # dummy app
    with pytest.raises(ValueError, match="SECRET_KEY environment variable is required"):
        ProductionConfig.init_app(app)

def test_apierror_to_dict():
    err = APIError("Something went wrong", 401, {"info": "details"})
    d = err.to_dict()
    assert d["error"] == "Something went wrong"
    assert d["info"] == "details"

def test_logger_directory_creation(tmpdir, monkeypatch):
    monkeypatch.chdir(tmpdir)
    app = create_app("testing")
    setup_logger(app)
    assert os.path.exists("logs")

def test_consistency_hero_streak_reset(app):
    with app.app_context():
        user = seed_demo_user()
        save_carbon_record(user.id, {"total_monthly": 500.0, "estimated_annual": 6000.0, "carbon_score": 50, "impact_level": "High", "metadata": {"timestamp": "2026-01-01T00:00:00"}})
        save_carbon_record(user.id, {"total_monthly": 400.0, "estimated_annual": 4800.0, "carbon_score": 50, "impact_level": "Medium", "metadata": {"timestamp": "2026-02-01T00:00:00"}})
        save_carbon_record(user.id, {"total_monthly": 450.0, "estimated_annual": 5400.0, "carbon_score": 50, "impact_level": "Medium", "metadata": {"timestamp": "2026-03-01T00:00:00"}})
        save_carbon_record(user.id, {"total_monthly": 400.0, "estimated_annual": 4800.0, "carbon_score": 50, "impact_level": "Medium", "metadata": {"timestamp": "2026-04-01T00:00:00"}})
        save_carbon_record(user.id, {"total_monthly": 350.0, "estimated_annual": 4200.0, "carbon_score": 50, "impact_level": "Low", "metadata": {"timestamp": "2026-05-01T00:00:00"}})
        
        history = get_user_history(user.id)
        gamification = generate_gamification_data(user.id, history)
        consistency = next((a for a in gamification["achievements"] if a["id"] == "consistency_hero"), None)
        if consistency:
            assert consistency["unlocked"] is False

def test_insight_generator_modes_and_bests():
    history = [
        {"total_monthly": 200, "carbon_score": 90},
        {"total_monthly": 300, "carbon_score": 70}
    ]
    analytics = {
        "monthly_average": 200,
        "best_score": 90,
        "improvement_percentage": 15
    }
    recommendations = []
    gamification = {
        "achievements": [{"unlocked": True}],
        "goals": [{"percentage_complete": 85, "status": "In Progress", "title": "My Test Goal"}],
        "recommended_goal": {"title": "Test Goal"},
        "near_achievement": True,
        "next_achievement": {"title": "Next Ach"}
    }
    
    context = build_coach_context(history, analytics, recommendations, gamification)
    prompt = build_prompt(context)
    coach = generate_insights(prompt)
    assert coach["insight_confidence"] == "High"
    assert coach["personality_mode"] == "encouraging"
    assert "fantastic" in coach["coaching_message"] or "sustainable habits" in coach["coaching_message"]
    
def test_prompt_builder_empty():
    prompt = build_prompt({"has_data": False})
    assert prompt["action"] == "generate_empty"
    prompt2 = build_prompt({"has_data": True, "trend_direction": "stable"})
    assert prompt2["personality_mode"] == "guidance"
    
def test_app_404_handler(client):
    response = client.get("/nonexistent-route")
    assert response.status_code == 404
    data = json.loads(response.data)
    assert data["message"] == "Resource not found"

def test_calculator_validation_fail(client):
    payload = {
        "transport_mode": "car",
        "transport_distance": 9999.0, # Exceeds max 500
        "transport_days": 20,
        "electricity_units": 100.0,
        "food_diet": "mixed",
        "shopping_tier": "medium",
        "waste_tier": "low"
    }
    response = client.post("/api/calculator/calculate", json=payload)
    assert response.status_code == 400

def test_recommendation_rules_gaps():
    history = [
        {"total_monthly": 1000, "category_breakdown": {"transportation": 400, "electricity": 500, "waste": 200}},
        {"total_monthly": 500, "category_breakdown": {"transportation": 100, "electricity": 100, "waste": 50}}
    ]
    recs = generate_recommendations(history)
    assert len(recs) > 0
    
    recs_empty = generate_recommendations([])
    assert recs_empty == []
    
    history_zero = [
        {"total_monthly": 0, "category_breakdown": {"transportation": 400, "electricity": 500, "waste": 200}}
    ]
    recs_zero = generate_recommendations(history_zero)
    assert recs_zero == []
