# Carbon Emission Factors

# Transportation: kg CO2 per km
EMISSION_FACTORS_TRANSPORT = {
    "walking": 0.0,
    "bicycle": 0.0,
    "train": 0.04,
    "bus": 0.10,
    "motorcycle": 0.11,
    "car": 0.20,
}

# Electricity: kg CO2 per kWh (unit)
EMISSION_FACTOR_ELECTRICITY = 0.4  # global average approx

# Food: Fixed monthly kg CO2 estimate
EMISSION_FACTORS_FOOD = {
    "vegetarian": 150.0,
    "mixed": 250.0,
    "non-vegetarian": 350.0,
}

# Shopping: Fixed monthly kg CO2 estimate
EMISSION_FACTORS_SHOPPING = {
    "low": 50.0,
    "medium": 120.0,
    "high": 250.0,
}

# Waste: Fixed monthly kg CO2 estimate
EMISSION_FACTORS_WASTE = {
    "low": 20.0,
    "medium": 60.0,
    "high": 120.0,
}

CALCULATOR_VERSION = "1.0.0"

