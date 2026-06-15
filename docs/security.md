# EcoPilot Security & Threat Model

This document outlines the security architecture, threat model, and protective controls implemented across the EcoPilot application.

## 1. Threat Model

We assume the following primary threats based on the OWASP Top 10:
*   **T1: Broken Authentication (Spoofing/Tampering)** - Malicious actors attempting to read or modify another user's carbon tracking history.
*   **T2: Injection & Payload Abuse** - Malicious inputs targeting the SQLite database or attempting prompt injection against the Gemini AI integration.
*   **T3: Denial of Service / Resource Exhaustion** - Automated scrapers or bots spamming the `/api/calculator/calculate` endpoint, driving up Google Cloud billing costs for the Gemini API.
*   **T4: Data Exposure** - Intercepting unencrypted traffic or extracting sensitive API keys from the source code.

## 2. Security Controls

### 2.1 API Security & Rate Limiting
*   **Flask-Limiter** is configured globally with a default limit of `200 per day; 50 per hour` per IP address.
*   The Gemini AI route is specifically rate-limited to prevent LLM-specific Denial of Wallet (DoW) attacks.

### 2.2 Input Validation
*   All inbound JSON payloads to the calculator are strictly validated using type and range boundaries to ensure anomalous data (e.g., negative distances or massive electricity usage) is rejected before touching the LLM or Database.

### 2.3 Secrets Management
*   Zero hardcoded secrets.
*   `GEMINI_API_KEY`, `SECRET_KEY`, and `DATABASE_URL` are injected purely via environment variables in Vercel and Render.
*   `.env` files are explicitly blocked via `.gitignore`.

### 2.4 Secure Deployment & Headers
*   **HTTPS Only**: Vercel and Render enforce TLS 1.3 by default.
*   **Flask-Talisman**: We have successfully migrated to `Flask-Talisman` to enforce strict OWASP HTTP headers programmatically across all responses.
*   **CSP Strategy**: Our Content Security Policy (CSP) is intentionally configured to preserve full API compatibility with our Vercel-hosted React frontend:
    ```json
    {
      "default-src": ["'self'", "'unsafe-inline'", "https://eco-pilot-ai-wheat.vercel.app"],
      "connect-src": ["'self'", "https://eco-pilot-ai-wheat.vercel.app"]
    }
    ```
*   **Cookie Security**: 
    *   `SESSION_COOKIE_SECURE = True`
    *   `SESSION_COOKIE_HTTPONLY = True`
    *   `SESSION_COOKIE_SAMESITE = "Lax"`

## 3. Dependency Auditing & Vulnerability Management

### 3.1 Security Automation
To prevent supply chain attacks and known CVEs from entering the codebase, EcoPilot employs a multi-layered dependency auditing strategy:
*   **Backend Scans**: `pip-audit`, `safety`, and `bandit` are utilized to scan Python dependencies for known CVEs and parse the abstract syntax tree for security anomalies.
*   **Frontend Scans**: `npm audit --audit-level=high` is utilized to catch critical React and Vite vulnerabilities.

### 3.2 CI Security Checks
All code merged to `main` or opened as a Pull Request is gated by a GitHub Actions workflow (`.github/workflows/security.yml`).
*   The workflow installs dependencies and runs the full suite (`bandit`, `safety`, `pip-audit`, `npm audit`).
*   A deployment is blocked if any high-severity vulnerability is detected.

## 4. Future Enhancements
*   **JWT Authentication**: Transitioning from a single-tenant MVP to a robust multi-tenant system using short-lived Access Tokens and HTTP-Only secure Refresh Tokens.
