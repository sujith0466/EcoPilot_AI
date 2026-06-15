from typing import List


def build_coach_context(
    history: List[dict],
    analytics: dict,
    recommendations: List[dict],
    gamification: dict = None,
) -> dict:
    """Builds a structured context bridging analytics and the AI prompt layer."""
    latest = history[0] if history else None

    context = {
        "has_data": bool(latest),
        "latest_score": latest.get("carbon_score", 0) if latest else 0,
        "latest_total": latest.get("total_monthly", 0) if latest else 0,
        "best_score": analytics.get("best_score", 0),
        "improvement_pct": analytics.get("improvement_percentage", 0),
        "monthly_avg": analytics.get("monthly_average", 0),
        "top_recommendation": recommendations[0] if recommendations else None,
        "is_personal_best": False,
        "trend_direction": "stable",
        "gamification": gamification or {},
    }

    if (
        latest
        and context["latest_score"] >= context["best_score"]
        and context["latest_score"] > 0
    ):
        context["is_personal_best"] = True

    if context["improvement_pct"] >= 5:
        context["trend_direction"] = "improving"
    elif context["improvement_pct"] <= -5:
        context["trend_direction"] = "declining"

    return context

