from services.calculator_service import generate_footprint_report

def test_calculator_service():
    """Test calculator core math logic."""
    payload = {
        "transport_mode": "car",
        "transport_distance": 15,
        "transport_days": 20,
        "electricity_units": 200,
        "food_diet": "mixed",
        "shopping_tier": "medium",
        "waste_tier": "medium"
    }
    report = generate_footprint_report(payload)
    assert report["total_monthly"] > 0
    assert report["carbon_score"] > 0
    assert "breakdown" in report
