def build_prompt(context: dict) -> dict:
    """Builds a strict instructional prompt dictionary based on context."""
    if not context.get("has_data"):
        return {"action": "generate_empty"}

    trend = context.get("trend_direction", "stable")

    # Determine Coach Personality Mode
    if trend == "improving":
        personality = "encouraging"
    elif trend == "declining":
        personality = "action-oriented"
    else:
        personality = "guidance"

    prompt = {
        "action": "generate_insights",
        "data": context,
        "personality_mode": personality,
        "instructions": [
            "Calculate sustainability_grade based on latest_score.",
            "Determine insight_confidence.",
            "Generate explainability sections (observation, reason, impact) for top_recommendation.",
            "Formulate coaching message matching personality_mode.",
        ],
    }
    return prompt

