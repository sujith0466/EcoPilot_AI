from typing import List
from utils.recommendation_rules import ACTIVE_RULES


def generate_recommendations(history: List[dict]) -> List[dict]:
    """
    Generate actionable recommendations by applying the rule engine to the user's history.
    """
    if not history:
        return []

    latest_record = history[0]  # Assuming history is ordered newest first

    recommendations = []
    for rule in ACTIVE_RULES:
        rec = rule.evaluate(latest_record, history)
        if rec:
            recommendations.append(rec)

    # Sort recommendations by recommendation_score (descending)
    recommendations.sort(key=lambda x: x["recommendation_score"], reverse=True)

    # Cap at top 5 recommendations
    return recommendations[:5]

