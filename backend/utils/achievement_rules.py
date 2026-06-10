from typing import List


class BaseAchievement:
    id: str
    title: str
    description: str
    icon_name: str
    difficulty: str

    def evaluate(self, history: List[dict]) -> dict:
        pass


class EcoStarter(BaseAchievement):
    id = "eco_starter"
    title = "Eco Starter"
    description = "Complete your first carbon footprint calculation."
    icon_name = "leaf"
    difficulty = "Easy"

    def evaluate(self, history: List[dict]) -> dict:
        unlocked = len(history) > 0
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "icon_name": self.icon_name,
            "difficulty": self.difficulty,
            "unlocked": unlocked,
            "unlocked_at": history[-1].get("calculated_at") if unlocked else None,
            "near_achievement": False,
        }


class GreenPerformer(BaseAchievement):
    id = "green_performer"
    title = "Green Performer"
    description = "Achieve a Carbon Score of 80 or higher."
    icon_name = "star"
    difficulty = "Medium"

    def evaluate(self, history: List[dict]) -> dict:
        unlocked_at = None
        unlocked = False
        near = False

        # history is newest first, reverse to check oldest to newest
        for record in reversed(history):
            score = record.get("carbon_score", 0)
            if score >= 80:
                unlocked = True
                unlocked_at = record.get("calculated_at")
                break

        if not unlocked and history:
            latest_score = history[0].get("carbon_score", 0)
            if latest_score >= 70:
                near = True

        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "icon_name": self.icon_name,
            "difficulty": self.difficulty,
            "unlocked": unlocked,
            "unlocked_at": unlocked_at,
            "near_achievement": near,
        }


class ConsistencyHero(BaseAchievement):
    id = "consistency_hero"
    title = "Consistency Hero"
    description = "Improve your footprint 3 times consecutively."
    icon_name = "trending-up"
    difficulty = "Hard"

    def evaluate(self, history: List[dict]) -> dict:
        unlocked = False
        unlocked_at = None
        near = False
        streak = 0

        if len(history) >= 2:
            reversed_history = list(reversed(history))
            for i in range(1, len(reversed_history)):
                prev = reversed_history[i - 1].get("total_monthly", 0)
                curr = reversed_history[i].get("total_monthly", 0)
                if 0 < curr < prev:
                    streak += 1
                    if streak >= 3 and not unlocked:
                        unlocked = True
                        unlocked_at = reversed_history[i].get("calculated_at")
                else:
                    streak = 0

        if not unlocked and streak == 2:
            near = True

        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "icon_name": self.icon_name,
            "difficulty": self.difficulty,
            "unlocked": unlocked,
            "unlocked_at": unlocked_at,
            "near_achievement": near,
        }


ACHIEVEMENTS = [EcoStarter(), GreenPerformer(), ConsistencyHero()]


def evaluate_achievements(history: List[dict]) -> List[dict]:
    return [ach.evaluate(history) for ach in ACHIEVEMENTS]

