from extensions import db
from models.goal import Goal
from utils.achievement_rules import evaluate_achievements
from datetime import datetime


def generate_gamification_data(user_id: int, history: list) -> dict:
    """Evaluate achievements and track goal progress."""
    achievements = evaluate_achievements(history)

    # Process goals
    goals = Goal.query.filter_by(user_id=user_id).order_by(Goal.created_at.desc()).limit(10).all()
    goals_data = []

    baseline = history[-1].get("total_monthly", 0) if history else 0
    latest = history[0].get("total_monthly", 0) if history else 0

    for g in goals:
        if g.status == "Completed":
            pct = 100.0
        else:
            if g.goal_type == "reduction" and baseline > 0:
                target_reduction = baseline * (g.target_value / 100.0)
                actual_reduction = baseline - latest
                pct = (
                    (actual_reduction / target_reduction) * 100
                    if target_reduction > 0
                    else 0
                )
                pct = max(0.0, min(100.0, pct))

                if pct >= 100.0:
                    g.status = "Completed"
                    g.completed_at = datetime.utcnow()
                    db.session.commit()
            else:
                pct = 0.0

        goals_data.append(
            {
                "id": g.id,
                "title": g.title,
                "description": g.description,
                "status": g.status,
                "percentage_complete": round(pct, 1),
            }
        )

    # Recommended Goal (if no goals or all completed)
    recommended_goal = None
    in_progress = [g for g in goals_data if g["status"] == "In Progress"]
    if not in_progress:
        recommended_goal = {
            "title": "Reduce footprint by 10%",
            "description": "A great starting point for sustainability.",
            "target_value": 10.0,
            "goal_type": "reduction",
        }

    return {
        "achievements": achievements,
        "goals": goals_data,
        "recommended_goal": recommended_goal,
    }


def create_goal(
    user_id: int,
    title: str,
    description: str,
    target_value: float,
    goal_type: str = "reduction",
) -> dict:
    g = Goal(
        user_id=user_id,
        title=title,
        description=description,
        target_value=target_value,
        goal_type=goal_type,
    )
    db.session.add(g)
    db.session.commit()
    return {"id": g.id, "title": g.title, "status": g.status}

