from abc import ABC, abstractmethod
from typing import Optional, List


class BaseRule(ABC):
    """Abstract base class for all recommendation rules."""

    @abstractmethod
    def evaluate(self, latest_record: dict, history: List[dict]) -> Optional[dict]:
        """
        Evaluate the rule against the latest record and history.
        Return a recommendation dictionary if triggered, else None.
        """
        pass

    def _build_recommendation(
        self,
        id_str: str,
        title: str,
        description: str,
        estimated_reduction: float,
        priority: str,
        difficulty: str,
        category: str,
        reasoning: str,
        recommendation_score: int,
        quick_win: bool,
    ) -> dict:
        return {
            "id": id_str,
            "title": title,
            "description": description,
            "estimated_reduction": round(estimated_reduction, 2),
            "priority": priority,
            "difficulty": difficulty,
            "category": category,
            "reasoning": reasoning,
            "recommendation_score": recommendation_score,
            "quick_win": quick_win,
        }


class HighTransportRule(BaseRule):
    """Triggers if transportation is > 30% of total footprint."""

    def evaluate(self, latest_record: dict, history: List[dict]) -> Optional[dict]:
        breakdown = latest_record.get("category_breakdown", {})
        total = latest_record.get("total_monthly", 0)
        if total == 0:
            return None

        transport_fp = breakdown.get("transportation", 0)
        percentage = transport_fp / total

        if percentage > 0.30:
            reduction = transport_fp * 0.15  # Assuming a 15% reduction
            return self._build_recommendation(
                id_str="transport_public_01",
                title="Use Public Transport Twice Weekly",
                description="Swapping a few car trips for bus or train can drastically lower your footprint.",
                estimated_reduction=reduction,
                priority="High",
                difficulty="Low",
                category="Transportation",
                reasoning=f"Transportation contributes {int(percentage * 100)}% of your monthly footprint.",
                recommendation_score=85,
                quick_win=True,
            )
        return None


class HighElectricityRule(BaseRule):
    """Triggers if electricity is > 40% of total footprint."""

    def evaluate(self, latest_record: dict, history: List[dict]) -> Optional[dict]:
        breakdown = latest_record.get("category_breakdown", {})
        total = latest_record.get("total_monthly", 0)
        if total == 0:
            return None

        elec_fp = breakdown.get("electricity", 0)
        percentage = elec_fp / total

        if percentage > 0.40:
            reduction = elec_fp * 0.20  # 20% reduction
            return self._build_recommendation(
                id_str="elec_led_01",
                title="Switch to LED Lighting",
                description="LED bulbs use up to 90% less energy and last much longer.",
                estimated_reduction=reduction,
                priority="High",
                difficulty="Low",
                category="Electricity",
                reasoning=f"Electricity contributes {int(percentage * 100)}% of your footprint.",
                recommendation_score=90,
                quick_win=True,
            )
        return None


class WorseningTrendBehaviorRule(BaseRule):
    """Triggers if the current footprint is at least 10% worse than the average of the history."""

    def evaluate(self, latest_record: dict, history: List[dict]) -> Optional[dict]:
        if not history or len(history) < 2:
            return None

        current_total = latest_record.get("total_monthly", 0)

        # Calculate historical average excluding the latest record
        past_records = history[1:]
        if not past_records:
            return None

        avg_past = sum(r.get("total_monthly", 0) for r in past_records) / len(
            past_records
        )

        if avg_past > 0 and current_total > (avg_past * 1.10):
            return self._build_recommendation(
                id_str="behavior_trend_01",
                title="Review Recent Lifestyle Changes",
                description="Your footprint has spiked recently. Take a moment to review what changed this month.",
                estimated_reduction=current_total - avg_past,
                priority="Medium",
                difficulty="Medium",
                category="Behavior",
                reasoning="Your current footprint is more than 10% higher than your historical average.",
                recommendation_score=70,
                quick_win=False,
            )
        return None


class HighWasteRule(BaseRule):
    """Triggers if waste > 15%."""

    def evaluate(self, latest_record: dict, history: List[dict]) -> Optional[dict]:
        breakdown = latest_record.get("category_breakdown", {})
        total = latest_record.get("total_monthly", 0)
        if total == 0:
            return None

        waste_fp = breakdown.get("waste", 0)
        percentage = waste_fp / total

        if percentage > 0.15:
            return self._build_recommendation(
                id_str="waste_compost_01",
                title="Start a Home Compost",
                description="Composting food scraps reduces methane emissions from landfills.",
                estimated_reduction=waste_fp * 0.40,
                priority="Medium",
                difficulty="High",
                category="Waste",
                reasoning=f"Waste contributes {int(percentage * 100)}% of your footprint.",
                recommendation_score=60,
                quick_win=False,
            )
        return None


# Registry of all active rules
ACTIVE_RULES = [
    HighTransportRule(),
    HighElectricityRule(),
    HighWasteRule(),
    WorseningTrendBehaviorRule(),
]

