from models.user import User
from models.carbon_record import CarbonRecord
from services.tracking_service import save_carbon_record, get_user_history

def test_save_carbon_record(app):
    """Test saving a footprint to the database."""
    with app.app_context():
        from extensions import db

        user = User(username="test_user")
        db.session.add(user)
        db.session.commit()

        report = {
            "total_monthly": 450.0,
            "estimated_annual": 5400.0,
            "carbon_score": 85,
            "impact_level": "Good",
            "metadata": {"timestamp": "2026-06-10T14:00:00Z"},
            "breakdown": {"transportation": 20.0},
        }

        record = save_carbon_record(user.id, report)

        assert record.id is not None
        assert record.total_monthly == 450.0
        assert record.record_month == 6
        assert record.record_year == 2026

def test_get_user_history(app):
    """Test retrieving history."""
    with app.app_context():
        from extensions import db

        user = User(username="history_user")
        db.session.add(user)
        db.session.commit()

        for i in range(15):
            r = CarbonRecord(
                user_id=user.id,
                total_monthly=100.0,
                estimated_annual=1200.0,
                carbon_score=90,
                impact_level="Excellent",
                category_breakdown={},
                record_month=1,
                record_year=2026,
            )
            db.session.add(r)
        db.session.commit()

        history = get_user_history(user.id, limit=12)
        assert len(history) == 12
