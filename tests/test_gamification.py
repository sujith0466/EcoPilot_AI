from utils.achievement_rules import evaluate_achievements
from services.gamification_service import (
    generate_gamification_data,
    create_goal,
)
from models.user import User

def test_achievement_rules():
    history = [
        {"total_monthly": 100, "carbon_score": 85, "calculated_at": "now"},
        {"total_monthly": 150, "carbon_score": 75, "calculated_at": "yesterday"},
        {"total_monthly": 200, "carbon_score": 65, "calculated_at": "last_week"},
    ]

    achievements = evaluate_achievements(history)

    # EcoStarter should be true
    assert achievements[0]["unlocked"] is True

    # GreenPerformer should be true (score 85)
    assert achievements[1]["unlocked"] is True

    # ConsistencyHero should be false (only 2 improvements: 200->150, 150->100)
    # Wait, streak is 2.
    assert achievements[2]["unlocked"] is False
    assert achievements[2]["near_achievement"] is True

def test_gamification_service(app):
    with app.app_context():
        from extensions import db

        user = User(username="gami_user")
        db.session.add(user)
        db.session.commit()

        create_goal(user.id, "Reduce 20%", "Desc", 20.0, "reduction")

        history = [
            {"total_monthly": 80, "carbon_score": 85},  # Latest
            {"total_monthly": 100, "carbon_score": 70},  # Baseline
        ]

        data = generate_gamification_data(user.id, history)

        # Baseline = 100. Target = 20% of 100 = 20.
        # Latest = 80. Actual reduction = 100 - 80 = 20.
        # Percentage complete = 100%
        goal = data["goals"][0]
        assert goal["percentage_complete"] == 100.0
        assert goal["status"] == "Completed"
