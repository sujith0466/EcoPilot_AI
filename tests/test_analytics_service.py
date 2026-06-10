from models.user import User
from models.carbon_record import CarbonRecord
from services.analytics_service import (
    calculate_monthly_average,
    get_best_score,
    calculate_improvement,
)
import datetime

def test_analytics_calculations(app):
    """Test aggregation logic in the database."""
    with app.app_context():
        from extensions import db

        user = User(username="analytics_user")
        db.session.add(user)
        db.session.commit()

        # Oldest record: bad footprint
        r1 = CarbonRecord(
            user_id=user.id,
            total_monthly=1000.0,
            estimated_annual=12000.0,
            carbon_score=50,
            impact_level="High",
            category_breakdown={},
            record_month=1,
            record_year=2026,
            calculated_at=datetime.datetime(2026, 1, 1),
        )

        # Newest record: improved footprint
        r2 = CarbonRecord(
            user_id=user.id,
            total_monthly=500.0,
            estimated_annual=6000.0,
            carbon_score=80,
            impact_level="Good",
            category_breakdown={},
            record_month=2,
            record_year=2026,
            calculated_at=datetime.datetime(2026, 2, 1),
        )

        db.session.add_all([r1, r2])
        db.session.commit()

        history = [
            {"total_monthly": 500.0, "carbon_score": 80, "calculated_at": r2.calculated_at},
            {"total_monthly": 1000.0, "carbon_score": 50, "calculated_at": r1.calculated_at}
        ]

        avg = calculate_monthly_average(history)
        assert avg == 750.0

        best = get_best_score(history)
        assert best == 80

        imp = calculate_improvement(history)
        assert imp == 50.0
