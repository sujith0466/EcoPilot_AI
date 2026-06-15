from typing import List

def calculate_monthly_average(history: List[dict]) -> float:
    """Calculates the user's average monthly carbon footprint using in-memory history."""
    if not history:
        return 0.0
    total = sum(r.get("total_monthly", 0) for r in history)
    return round(total / len(history), 2)

def get_best_score(history: List[dict]) -> int:
    """Retrieves the user's highest carbon score using in-memory history."""
    if not history:
        return 0
    return max(r.get("carbon_score", 0) for r in history)

def calculate_improvement(history: List[dict]) -> float:
    """Calculates the percentage improvement from the oldest record to the newest using in-memory history."""
    if len(history) < 2:
        return 0.0

    # history is sorted newest first
    newest_monthly = history[0].get("total_monthly", 0)
    oldest_monthly = history[-1].get("total_monthly", 0)

    if oldest_monthly == 0:
        return 0.0

    improvement = ((oldest_monthly - newest_monthly) / oldest_monthly) * 100
    return round(improvement, 2)

def generate_analytics_summary(history: List[dict]) -> dict:
    """Generates a complete analytics snapshot for the dashboard in-memory without DB queries."""
    return {
        "monthly_average": calculate_monthly_average(history),
        "best_score": get_best_score(history),
        "improvement_percentage": calculate_improvement(history),
    }

