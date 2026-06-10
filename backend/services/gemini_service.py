import os
import google.generativeai as genai
import json
from config import config_by_name

# Initialize config
env = os.getenv("FLASK_ENV", "development")
config = config_by_name[env]

if config.GEMINI_API_KEY:
    genai.configure(api_key=config.GEMINI_API_KEY)

def get_gemini_insights(prompt_text: str) -> dict:
    """
    Calls Gemini 2.5 Flash to generate AI coaching insights.
    Returns a dictionary matching the fallback rule engine schema.
    """
    if not config.GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is not configured.")

    model = genai.GenerativeModel(config.GEMINI_MODEL)
    
    system_instruction = (
        "You are EcoPilot's AI Carbon Coach. Provide highly actionable, concise insights "
        "to help the user reduce their carbon footprint based on the provided data. "
        "Return ONLY a valid JSON object matching this schema exactly:\n"
        "{\n"
        '  "insights": ["String insight 1", "String insight 2"],\n'
        '  "tone": "encouraging",\n'
        '  "urgent_actions": ["String action 1"]\n'
        "}\n"
    )

    full_prompt = f"{system_instruction}\n\nContext Data:\n{prompt_text}"

    response = model.generate_content(
        full_prompt,
        generation_config=genai.types.GenerationConfig(
            response_mime_type="application/json"
        )
    )

    try:
        data = json.loads(response.text)
        # Ensure schema compliance
        if "insights" not in data or "urgent_actions" not in data:
             raise ValueError("Invalid schema returned from Gemini")
        return data
    except Exception as e:
        raise ValueError(f"Failed to parse Gemini output: {e}")
