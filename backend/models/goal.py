from extensions import db
from models.base import BaseModel
from datetime import datetime


class Goal(BaseModel):
    __tablename__ = "goals"

    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False, index=True
    )

    goal_type = db.Column(
        db.String(50), nullable=False
    )  # e.g., "reduction", "score", "consistency"
    target_value = db.Column(db.Float, nullable=False)
    current_progress = db.Column(db.Float, default=0.0)

    status = db.Column(
        db.String(20), default="In Progress"
    )  # "In Progress", "Completed"

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime, nullable=True)

    # Text metadata
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(255), nullable=True)

    __table_args__ = (
        db.Index("ix_goals_user_status", "user_id", "status"),
        db.Index("ix_goals_user_created_at_desc", "user_id", db.text("created_at DESC")),
    )

