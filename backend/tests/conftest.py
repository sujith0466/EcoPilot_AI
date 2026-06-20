import pytest
import os
from app import create_app
from extensions import db
from utils.seed import seed_demo_user

@pytest.fixture
def app():
    os.environ["FLASK_ENV"] = "testing"
    app = create_app("testing")
    
    # We must ensure the app context is pushed and DB is set up
    with app.app_context():
        db.create_all()
        # Seed the demo user to ensure tests relying on it work
        seed_demo_user()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()
