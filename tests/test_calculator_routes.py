def test_calculator_success(client):
    """Test successful calculator payload."""
    payload = {
        "transport_mode": "car",
        "transport_distance": 15,
        "transport_days": 22,
        "electricity_units": 200,
        "food_diet": "mixed",
        "shopping_tier": "low",
        "waste_tier": "low",
    }
    response = client.post("/api/calculator/calculate", json=payload)
    assert response.status_code == 200
    data = response.get_json()["data"]
    assert data["total_monthly"] > 0
    assert "carbon_score" in data

def test_calculator_validation_missing(client):
    """Test missing fields."""
    payload = {"transport_mode": "car"}
    response = client.post("/api/calculator/calculate", json=payload)
    assert response.status_code == 400
    assert "errors" in response.get_json()

def test_calculator_validation_negative(client):
    """Test negative values blocked by WTForms bounds."""
    payload = {
        "transport_mode": "car",
        "transport_distance": -5,
        "transport_days": 22,
        "electricity_units": 200,
        "food_diet": "mixed",
        "shopping_tier": "low",
        "waste_tier": "low",
    }
    response = client.post("/api/calculator/calculate", json=payload)
    assert response.status_code == 400
    errors = response.get_json()["errors"]
    assert "transport_distance" in errors

def test_calculator_validation_upper_bounds(client):
    """Test values exceeding upper limits."""
    payload = {
        "transport_mode": "car",
        "transport_distance": 10000,  # Exceeds 1000 limit
        "transport_days": 32,  # Exceeds 31
        "electricity_units": 20000,  # Exceeds 10000
        "food_diet": "mixed",
        "shopping_tier": "low",
        "waste_tier": "low",
    }
    response = client.post("/api/calculator/calculate", json=payload)
    assert response.status_code == 400

def test_calculator_validation_invalid_category(client):
    """Test invalid category matching."""
    payload = {
        "transport_mode": "spaceship",
        "transport_distance": 15,
        "transport_days": 22,
        "electricity_units": 200,
        "food_diet": "mixed",
        "shopping_tier": "low",
        "waste_tier": "low",
    }
    response = client.post("/api/calculator/calculate", json=payload)
    assert response.status_code == 400
    assert "transport_mode" in response.get_json()["errors"]
