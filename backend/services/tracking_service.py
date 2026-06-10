from extensions import db
from models.carbon_record import CarbonRecord
from datetime import datetime, timezone


def save_carbon_record(user_id: int, report: dict):
    """Saves a generated footprint report to the database for the given user."""

    # Extract the breakdown and save to JSON
    breakdown = report.get("breakdown", {})

    # Determine the month and year from the report metadata timestamp
    timestamp_str = report.get("metadata", {}).get("timestamp")
    if timestamp_str:
        dt = datetime.fromisoformat(timestamp_str)
    else:
        dt = datetime.now(timezone.utc)

    record = CarbonRecord(
        user_id=user_id,
        total_monthly=report.get("total_monthly"),
        estimated_annual=report.get("estimated_annual"),
        carbon_score=report.get("carbon_score"),
        impact_level=report.get("impact_level"),
        category_breakdown=breakdown,
        record_month=dt.month,
        record_year=dt.year,
        calculated_at=dt,
    )

    db.session.add(record)
    db.session.commit()
    return record


def get_user_history(user_id: int, limit: int = 12):
    """Retrieves the most recent carbon records for a user."""
    records = (
        CarbonRecord.query.filter_by(user_id=user_id)
        .order_by(CarbonRecord.calculated_at.desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "id": r.id,
            "total_monthly": r.total_monthly,
            "carbon_score": r.carbon_score,
            "impact_level": r.impact_level,
            "record_month": r.record_month,
            "record_year": r.record_year,
            "calculated_at": r.calculated_at.isoformat(),
        }
        for r in records
    ]

