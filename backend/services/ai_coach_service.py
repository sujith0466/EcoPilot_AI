from utils.coach_context_builder import build_coach_context
from utils.prompt_builder import build_prompt
from utils.insight_generator import generate_insights
from services.gemini_service import get_gemini_insights
from utils.logger import logger

def generate_ai_coach_data(
    history: list, analytics: dict, recommendations: list, gamification: dict = None
) -> dict:
    """Orchestrates the AI Coach layers to produce the final payload."""
    context = build_coach_context(history, analytics, recommendations, gamification)
    prompt = build_prompt(context)
    
    try:
        # Try Gemini 2.5 Flash primary engine
        return get_gemini_insights(prompt)
    except Exception as e:
        logger.warning(f"Gemini API failed or unavailable, falling back to rule engine: {e}")
        # Graceful degradation to Rule Engine
        return generate_insights(prompt)

