# Architecture Overview

EcoPilot is designed using a clean, scalable, and modular structure tailored for a robust carbon tracking application.

## 1. Application Factory Pattern
The application initializes through `backend/app.py`, allowing dynamic configuration loading (`development`, `testing`, `production`) and decoupled extension initialization (`db`, `migrate`, `limiter`, `cache`).

## 2. Decoupled Service Layer
Business logic is strictly separated from routing and database models:
- **Calculator Service**: Calculates total footprints and estimates based on raw input.
- **Analytics Service**: A zero-query mathematical engine for calculating dashboard metrics.
- **Gamification Service**: Processes achievements and goal progression.
- **Recommendation Service**: Analyzes histories against a predefined ruleset to offer actionable tips.
- **AI Coach Service**: Constructs contextual prompts for dynamic conversational insights.

## 3. Storage Layer
Data is persisted using SQLAlchemy ORM (defaulting to SQLite for dev). 
- Models are indexed appropriately (e.g. `(user_id, calculated_at DESC)` in `CarbonRecord`) to support lightning-fast chronological lookups.
- Avoids N+1 querying paradigms by flattening historical queries.

## 4. Middleware & Security
- `Flask-Limiter` for rate limiting (429 handling).
- Global Error Handlers to intercept all 400, 404, 429, and 500 errors and return sanitized JSON responses.
- Enforced Security Headers (`X-XSS-Protection`, `Content-Security-Policy`).
