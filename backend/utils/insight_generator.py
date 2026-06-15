def generate_insights(prompt: dict) -> dict:
    """Heuristic generator that parses the prompt and generates text insights."""
    if prompt.get("action") == "generate_empty":
        return {
            "sustainability_grade": "N/A",
            "insight_confidence": "Low",
            "summary": "We don't have enough data to coach you yet. Log your first footprint!",
            "trend_analysis": "N/A",
            "recommendation_explanation": None,
            "coaching_message": "Log your daily activities to start receiving personalized coaching.",
            "personality_mode": "guidance",
        }

    data = prompt.get("data", {})
    personality = prompt.get("personality_mode", "guidance")

    score = data.get("latest_score", 0)
    grade = (
        "A" if score >= 90 else ("B" if score >= 75 else ("C" if score >= 60 else "D"))
    )

    is_pb = data.get("is_personal_best", False)
    trend = data.get("trend_direction", "stable")

    summary = (
        f"Your latest footprint is {data['latest_total']} kg CO₂, "
        f"earning you a score of {score}/100."
    )
    if is_pb:
        summary += " This is your personal best!"

    trend_analysis = "Your emissions are currently stable."
    if trend == "improving":
        trend_analysis = (
            f"Great job! Your footprint has improved by {data['improvement_pct']}% "
            "compared to your first record."
        )
    elif trend == "declining":
        trend_analysis = (
            f"Your footprint has worsened by {abs(data['improvement_pct'])}%. "
            "Let's work on getting back on track."
        )

    top_rec = data.get("top_recommendation")
    rec_exp = None
    if top_rec:
        rec_exp = {
            "observation": f"We noticed {top_rec['category']} is a significant part of your footprint.",
            "reason": top_rec["reasoning"],
            "impact": f"Implementing this can reduce {top_rec['estimated_reduction']} kg CO₂.",
        }

    coach_msg = "Keep logging your data and making small, consistent changes."
    if personality == "encouraging":
        coach_msg = "You're doing fantastic! Keep up the sustainable habits, you're setting a great example."
    elif personality == "action-oriented":
        coach_msg = (
            "It's time to take action. Focus on the top recommendation "
            "this week to immediately lower your footprint."
        )

    gami = data.get("gamification", {})
    goals = gami.get("goals", [])
    in_progress = [g for g in goals if g["status"] == "In Progress"]
    if in_progress:
        top_goal = in_progress[0]
        if top_goal["percentage_complete"] >= 80:
            coach_msg += (
                f" You are {top_goal['percentage_complete']}% of the way "
                f"to completing your goal: '{top_goal['title']}'!"
            )

    achievements = gami.get("achievements", [])
    near_ach = [a for a in achievements if a.get("near_achievement")]
    if near_ach:
        coach_msg += f" You are very close to unlocking the '{near_ach[0]['title']}' achievement!"

    return {
        "sustainability_grade": grade,
        "insight_confidence": "High",
        "summary": summary,
        "trend_analysis": trend_analysis,
        "recommendation_explanation": rec_exp,
        "coaching_message": coach_msg,
        "personality_mode": personality,
    }

