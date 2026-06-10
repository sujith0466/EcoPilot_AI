from extensions import db
from models.base import BaseModel


class User(BaseModel):
    __tablename__ = "users"

    username = db.Column(db.String(80), unique=True, nullable=False, index=True)

    # Relationships
    records = db.relationship(
        "CarbonRecord", backref="user", lazy=True, cascade="all, delete-orphan"
    )

