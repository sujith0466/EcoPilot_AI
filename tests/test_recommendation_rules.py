from utils.recommendation_rules import ACTIVE_RULES

def test_evaluate_rules():
    """Test rule evaluation engine."""
    latest_record = {"total_monthly": 1000, "category_breakdown": {"transportation": 500, "electricity": 200, "waste": 50}}
    history = [latest_record]
    
    rules = []
    for rule in ACTIVE_RULES:
        result = rule.evaluate(latest_record, history)
        if result:
            rules.append(result)

    assert len(rules) > 0
    assert any(r["category"] == "Transportation" for r in rules)
