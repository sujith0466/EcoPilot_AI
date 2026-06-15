# Security Policy

## Security Features

EcoPilot uses a defense-in-depth approach to protect user data and maintain high availability:

* **Content Security Policy (CSP)**: Mitigates XSS attacks by restricting resource loading to trusted domains (`'self'`, `eco-pilot-ai-wheat.vercel.app`).
* **X-Frame-Options**: Enforced as `SAMEORIGIN` to prevent clickjacking attacks.
* **X-Content-Type-Options**: Set to `nosniff` to avoid MIME confusion vulnerabilities.
* **Referrer Policy**: Configured as `strict-origin-when-cross-origin` to ensure that paths/queries are not leaked during cross-origin navigation.
* **Input Validation**: Uses `Zod` (Frontend) and `Marshmallow` (Backend) to guarantee schema safety and sanitize all user payloads.
* **Rate Limiting**: Employs `Flask-Limiter` to throttle requests (Calculator APIs: 300/hr, Dashboard APIs: 200/hr) neutralizing DDoS attempts.
* **Environment Variable Protection**: Crucial API keys (like Google Gemini) and database URIs are pulled dynamically via `os.environ` and are never hardcoded in source control.

## Responsible Disclosure

If you discover a security issue, please report it responsibly through the repository issue tracker or contact the maintainer privately before public disclosure. Do not exploit the vulnerability. We will work to resolve the issue promptly.

## Security Best Practices

* **Secrets stored in environment variables:** Never commit `.env` files to Git.
* **No hardcoded API keys:** Keep keys strictly within hosting environment panels (Vercel/Render).
* **Input validation on frontend and backend:** Treat all user input as hostile.
* **API abuse protection via rate limiting:** Maintain strict guardrails to preserve resources.
