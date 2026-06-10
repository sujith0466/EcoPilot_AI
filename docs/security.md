# Security Architecture

## Overview
EcoPilot prioritizes security from Phase 1. 

## Implemented Measures

1. **Centralized Configuration (`config.py`)**
   - Credentials loaded securely via Environment Variables.
   - Separate configurations for Dev, Test, and Production to prevent data leaks.

2. **Security Headers Middleware**
   - Configured in `app.py`.
   - Includes HSTS, Content-Type Options (nosniff), X-Frame-Options (SAMEORIGIN), X-XSS-Protection, and Content-Security-Policy.

3. **Secure Session Handling**
   - `SESSION_COOKIE_SECURE = True`
   - `SESSION_COOKIE_HTTPONLY = True`
   - `SESSION_COOKIE_SAMESITE = 'Lax'`

4. **Rate Limiting**
   - Implemented via `Flask-Limiter` to prevent brute force and DDoS attacks.
   - Default limits applied globally, with specific endpoint limits (e.g., 10/min on `/api/health`).

5. **Error Sanitization**
   - Custom `APIError` handlers in `errors.py`.
   - Ensures no sensitive stack traces are returned to the client in production.

## Next Steps
- Implement CSRF Protection for all forms using `Flask-WTF`.
- Set up a secrets manager.
