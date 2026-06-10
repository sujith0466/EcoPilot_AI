def get_health_status() -> dict:
    """
    Service function to check the health of the application.
    In a real-world scenario, this might check database connectivity,
    Redis availability, or third-party API statuses.
    """
    return {
        "status": "healthy",
        "version": "1.0.0",
        "components": {"database": "connected"},  # noqa: E501
    }

