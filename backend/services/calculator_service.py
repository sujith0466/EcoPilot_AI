from datetime import datetime, timezone
from utils.constants import (
    EMISSION_FACTORS_TRANSPORT,
    EMISSION_FACTOR_ELECTRICITY,
    EMISSION_FACTORS_FOOD,
    EMISSION_FACTORS_SHOPPING,
    EMISSION_FACTORS_WASTE,
    CALCULATOR_VERSION,
)


def calculate_transport(
    mode: str, distance_per_day: float, days_per_month: int
) -> float:
    factor = EMISSION_FACTORS_TRANSPORT.get(mode.lower(), 0.0)
    return distance_per_day * days_per_month * factor


def calculate_electricity(units: float) -> float:
    return units * EMISSION_FACTOR_ELECTRICITY


def calculate_categorical(category_dict: dict, tier: str) -> float:
    return category_dict.get(tier.lower(), 0.0)


def determine_impact_level(annual_footprint: float) -> str:
    """Determine impact level based on estimated annual kg CO2."""
    if annual_footprint < 4000:
        return "Excellent"
    elif annual_footprint < 8000:
        return "Good"
    elif annual_footprint < 12000:
        return "Average"
    else:
        return "High"


def calculate_carbon_score(annual_footprint: float) -> int:
    """
    Calculate a score from 0 to 100.
    100 means zero emissions, 0 means >= 20,000 kg CO2 annually.
    """
    max_emissions = 20000.0
    score = max(0, min(100, int(100 * (1 - (annual_footprint / max_emissions)))))
    return score


def generate_footprint_report(data: dict) -> dict:
    """Generate the full footprint report from validated input data."""

    transport_fp = calculate_transport(
        data["transport_mode"], data["transport_distance"], data["transport_days"]
    )
    electricity_fp = calculate_electricity(data["electricity_units"])
    food_fp = calculate_categorical(EMISSION_FACTORS_FOOD, data["food_diet"])
    shopping_fp = calculate_categorical(
        EMISSION_FACTORS_SHOPPING, data["shopping_tier"]
    )
    waste_fp = calculate_categorical(EMISSION_FACTORS_WASTE, data["waste_tier"])

    total_monthly = sum([transport_fp, electricity_fp, food_fp, shopping_fp, waste_fp])
    estimated_annual = total_monthly * 12

    impact_level = determine_impact_level(estimated_annual)
    carbon_score = calculate_carbon_score(estimated_annual)

    return {
        "metadata": {
            "version": CALCULATOR_VERSION,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        },
        "breakdown": {
            "transportation": round(transport_fp, 2),
            "electricity": round(electricity_fp, 2),
            "food": round(food_fp, 2),
            "shopping": round(shopping_fp, 2),
            "waste": round(waste_fp, 2),
        },
        "total_monthly": round(total_monthly, 2),
        "estimated_annual": round(estimated_annual, 2),
        "impact_level": impact_level,
        "carbon_score": carbon_score,
    }

