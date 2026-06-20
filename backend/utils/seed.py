from extensions import db
from models.user import User


def seed_demo_user() -> User:
    """Seed a demo user if one doesn't exist."""
    demo_user = User.query.filter_by(username="demo_user").first()
    if not demo_user:
        demo_user = User(username="demo_user")
        db.session.add(demo_user)
        db.session.commit()
    return demo_user

