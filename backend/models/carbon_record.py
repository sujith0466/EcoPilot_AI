from extensions import db
from models.base import BaseModel

from sqlalchemy import JSON
from datetime import datetime


class CarbonRecord(BaseModel):
    __tablename__ = "carbon_records"

    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False, index=True
    )

    total_monthly = db.Column(db.Float, nullable=False)
    estimated_annual = db.Column(db.Float, nullable=False)
    carbon_score = db.Column(db.Integer, nullable=False)
    impact_level = db.Column(db.String(50), nullable=False)

    # SQLAlchemy handles JSON natively for Postgres.
    # We use a standard JSON type.
    category_breakdown = db.Column(JSON, nullable=False)

    # Specific tracking fields
    record_month = db.Column(db.Integer, nullable=False)
    record_year = db.Column(db.Integer, nullable=False)
    calculated_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    __table_args__ = (
        db.Index("ix_carbon_records_user_id_calculated_at_desc", "user_id", db.text("calculated_at DESC")),
    )

