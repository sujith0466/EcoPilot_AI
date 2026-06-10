from services.ai_coach_service import generate_ai_coach_data
from utils.coach_context_builder import build_coach_context
from utils.prompt_builder import build_prompt

def test_ai_coach_empty_history():
    data = generate_ai_coach_data([], {}, [])
    assert data["insight_confidence"] == "Low"
    assert "We don't have enough data" in data["summary"]

def test_ai_coach_context_builder():
    history = [{"carbon_score": 95, "total_monthly": 100}]
    analytics = {"best_score": 90, "improvement_percentage": 10, "monthly_average": 200}
    recommendations = [
        {
            "category": "Transportation",
            "reasoning": "High usage.",
            "estimated_reduction": 15.0,
        }
    ]

    context = build_coach_context(history, analytics, recommendations)
    assert context["is_personal_best"] is True
    assert context["trend_direction"] == "improving"

def test_ai_coach_prompt_builder():
    context = {"has_data": True, "trend_direction": "declining"}
    prompt = build_prompt(context)
    assert prompt["personality_mode"] == "action-oriented"

def test_ai_coach_full_pipeline():
    history = [{"carbon_score": 85, "total_monthly": 400}]
    analytics = {
        "best_score": 90,
        "improvement_percentage": -10,
        "monthly_average": 350,
    }
    recommendations = [
        {
            "category": "Transportation",
            "reasoning": "You drive a lot.",
            "estimated_reduction": 20.0,
        }
    ]

    insights = generate_ai_coach_data(history, analytics, recommendations)
    assert insights["sustainability_grade"] == "B"
    assert insights["insight_confidence"] == "High"
    assert insights["personality_mode"] == "action-oriented"
    assert "worsened by 10" in insights["trend_analysis"]
    assert (
        insights["recommendation_explanation"]["observation"]
        == "We noticed Transportation is a significant part of your footprint."
    )
