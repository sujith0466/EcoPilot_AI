def test_dashboard_data(client):
    """Test getting dashboard data."""
    response = client.get("/api/dashboard/data")
    assert response.status_code == 200
    data = response.get_json()["data"]
    assert "user_id" in data
    assert "analytics" in data
    assert "history" in data
    assert "recommendations" in data
    assert "gamification" in data
    assert "ai_coach" in data
