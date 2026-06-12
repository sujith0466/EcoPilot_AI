import pytest
from app import create_app
from extensions import db
from models.user import User
from validators.schemas import CarbonCalculationRequestSchema
from marshmallow import ValidationError
import json

@pytest.fixture
def test_app():
    app = create_app("testing")
    with app.app_context():
        db.create_all()
        # Seed a test user
        user = User(username="TestUser")
        db.session.add(user)
        db.session.commit()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(test_app):
    return test_app.test_client()

def test_marshmallow_validation_success():
    schema = CarbonCalculationRequestSchema()
    data = {
        "transport_mode": "car",
        "transport_distance": 20,
        "transport_days": 10,
        "electricity_units": 100,
        "food_diet": "mixed",
        "shopping_tier": "medium",
        "waste_tier": "medium"
    }
    validated = schema.load(data)
    assert validated["transport_distance"] == 20

def test_marshmallow_validation_failure():
    schema = CarbonCalculationRequestSchema()
    data = {
        "transport_mode": "car",
        "transport_distance": -10,  # Invalid
        "transport_days": 10,
        "electricity_units": 100,
        "food_diet": "mixed",
        "shopping_tier": "medium",
        "waste_tier": "medium"
    }
    with pytest.raises(ValidationError):
        schema.load(data)

def test_calculator_route_validation_error(client):
    response = client.post("/api/calculator/calculate", json={
        "transport_mode": "car"
        # missing required fields
    })
    assert response.status_code == 400
    data = response.get_json()
    assert "errors" in data

def test_security_headers_present(client):
    response = client.get("/api/dashboard/data")
    headers = response.headers
    # Check Flask-Talisman injected headers
    assert "X-Frame-Options" in headers or "Content-Security-Policy" in headers
    # The route should return 200 or 401 depending on demo user setup
    assert response.status_code in [200, 401]

def test_ai_coach_fallback_behavior(client, monkeypatch):
    from services.ai_coach_service import generate_ai_coach_data
    
    # Mock Gemini to throw an exception
    def mock_gemini(*args, **kwargs):
        raise Exception("Gemini API down")
    
    monkeypatch.setattr("services.ai_coach_service.get_gemini_insights", mock_gemini)
    
    result = generate_ai_coach_data([], {}, [], {})
    assert "sustainability_grade" in result
    assert "summary" in result
    assert "coaching_message" in result

def test_dashboard_endpoint(client):
    response = client.get("/api/dashboard/data")
    assert response.status_code == 200
    data = response.get_json()
    assert "data" in data
    assert "analytics" in data["data"]
    assert "history" in data["data"]
