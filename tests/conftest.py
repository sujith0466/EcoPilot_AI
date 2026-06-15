import pytest
from app import create_app
from extensions import db

@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    app = create_app("testing")

    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()
