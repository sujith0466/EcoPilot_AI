from app import create_app

def test_config():
    """Test create_app without passing test config."""
    assert not create_app().testing
    assert create_app("testing").testing

def test_index(client):
    """Test the index route."""
    response = client.get("/")
    assert response.status_code == 200
    assert b"EcoPilot" in response.data
