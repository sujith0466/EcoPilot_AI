import pytest

def test_health_endpoint(client):
    """Test 1: GET /health returns 200"""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "success"
    assert "data" in data
    assert data["data"]["status"] == "healthy"


def test_calculator_valid_payload(client):
    """Test 2: Calculator accepts valid payload (200 + structure)"""
    payload = {
        "transport_mode": "car",
        "transport_distance": 15.5,
        "transport_days": 5,
        "electricity_units": 300.0,
        "food_diet": "mixed",
        "shopping_tier": "medium",
        "waste_tier": "low"
    }
    response = client.post("/api/calculator/calculate", json=payload)
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "success"
    assert "data" in data
    assert "carbon_score" in data["data"]
    assert "breakdown" in data["data"]


def test_calculator_invalid_payload(client):
    """Test 3: Calculator rejects invalid payload (400 validation error)"""
    payload = {
        "transport_mode": "car",
        "transport_distance": -15.5,  # Invalid: negative
        "transport_days": 5,
        "electricity_units": 300.0,
        "food_diet": "mixed",
        "shopping_tier": "medium",
        "waste_tier": "low"
    }
    response = client.post("/api/calculator/calculate", json=payload)
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "Validation failed"


def test_dashboard_endpoint(client):
    """Test 4: Dashboard endpoint returns JSON (200 + structure)"""
    payload = {
        "transport_mode": "car",
        "transport_distance": 15.5,
        "transport_days": 5,
        "electricity_units": 300.0,
        "food_diet": "mixed",
        "shopping_tier": "medium",
        "waste_tier": "low"
    }
    client.post("/api/calculator/calculate", json=payload)
    
    response = client.get("/api/dashboard/data")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "success"
    assert "data" in data
    assert "user_id" in data["data"]
    assert "history" in data["data"]
    assert "analytics" in data["data"]
    assert "recommendations" in data["data"]
    assert "gamification" in data["data"]
    assert "ai_coach" in data["data"]
