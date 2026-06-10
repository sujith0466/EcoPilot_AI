# EcoPilot — PromptWars Evaluation Report

**Project:** EcoPilot — AI-Powered Carbon Footprint Tracker  
**Evaluation Date:** June 10, 2026  
**Evaluator:** Internal Engineering Review  
**Version Assessed:** Hackathon Submission (v1.0)

---

## Executive Summary

EcoPilot demonstrates a solid hackathon-grade full-stack implementation with genuine strengths in modern frontend architecture, responsible AI integration, and security hygiene. The primary gaps are in testing coverage breadth and production-readiness features (authentication, caching, pagination). Scores below reflect a realistic assessment — not an optimistic one.

| Criterion | Score | Weight |
|---|---|---|
| Code Quality | 16 / 20 | 20% |
| Security | 14 / 20 | 20% |
| Efficiency | 14 / 20 | 20% |
| Testing | 12 / 20 | 20% |
| Accessibility | 13 / 20 | 20% |
| **Total** | **69 / 100** | 100% |

---

## 1. Code Quality — 16 / 20

### Overview

The codebase reflects a deliberate, modern architectural approach. The React frontend is organized around page-level components with shared layout primitives, and the Flask backend follows a factory pattern with route blueprints and a dedicated service layer. These are established conventions that reduce cognitive overhead and support future contribution.

### Strengths

- **Modern stack choices**: React 18 + Vite 5 is the current industry standard for performant SPAs. The choice avoids legacy patterns (Create React App, class components).
- **Component-level defensive coding**: Null checks and optional chaining are used consistently throughout JSX render paths. Components do not crash on missing or unexpected API response shapes.
- **ErrorBoundary isolation**: An `ErrorBoundary` component wraps page-level routes, preventing a single component failure from taking down the entire application. This is a production-quality pattern often omitted in hackathon submissions.
- **Clean API service layer**: All HTTP calls are centralized in `frontend/src/services/api.js`. This separation of concerns means API base URLs, headers, and error handling are not scattered across components.
- **Flask application factory**: `create_app()` in `app.py` enables proper testing isolation and environment-based configuration, following Flask best practices.
- **Blueprint-based routing**: Each domain (calculator, dashboard) is its own Flask Blueprint with its own route prefix. This is correctly structured for scaling.

### Weaknesses

- **Bundle size (~780KB uncompressed)**: The JavaScript bundle is large for an application of this scope. Recharts and Framer Motion are both significant dependencies. No dynamic `import()` code-splitting has been applied to route-level components. This translates to a slower initial load, particularly on mobile connections.
- **Hardcoded mock data in gamification layer**: The gamification engine (achievements, streaks, levels) appears to return partially static/mock data rather than computing values dynamically from the user's actual calculation history. While acceptable for a demo, this limits the feature's real-world value.
- **No TypeScript**: The frontend uses plain JavaScript. For a codebase of this size, the absence of TypeScript is not critical, but it does reduce IDE support and long-term maintainability.

### Score Rationale

The architecture is clean and modern, and the defensive coding patterns are commendable. The score is docked for the bundle size issue (a concrete, measurable problem) and the mock gamification data (a functional gap in a core feature).

**Score: 16 / 20**

---

## 2. Security — 14 / 20

### Overview

EcoPilot follows fundamental security hygiene correctly. Secrets are externalized, the `.gitignore` configuration is appropriate, and no credentials appear in source code. However, several production-critical security controls are absent.

### Strengths

- **Environment-variable-only secrets**: Both `GEMINI_API_KEY` and `SECRET_KEY` are read exclusively from environment variables via `os.environ` in `config.py` and `gemini_service.py`. This is the correct pattern.
- **`.env` excluded from git**: The `.gitignore` file correctly excludes `.env`, preventing accidental secret commits.
- **No hardcoded credentials in source**: A search across all source files (`config.py`, `gemini_service.py`, route files) confirms zero hardcoded API keys, passwords, or tokens. See [`security_audit.md`](security_audit.md) for the full scan report.
- **`.env.example` with placeholders**: A safe-to-commit `.env.example` template exists, providing onboarding guidance without exposing real values.
- **Backend input validation**: The `backend/validators/` layer validates incoming request payloads before they reach the database or AI service layer, reducing injection risk.

### Weaknesses

- **No authentication (demo mode)**: The application has no JWT or session-based authentication. All API endpoints are publicly accessible. The README correctly notes the architecture is "JWT-ready," but the implementation is absent. In a real deployment, this would expose all user data.
- **No rate limiting**: The Gemini API integration has per-request cost implications. Without rate limiting middleware (e.g., Flask-Limiter), the `/api/calculator/calculate` endpoint is vulnerable to abuse and could incur unexpected API charges.
- **No HTTPS enforcement in development**: The dev server communicates over HTTP. While this is standard for local development, there is no middleware or configuration to enforce HTTPS redirection in production builds.
- **CORS not configured**: No explicit CORS policy is configured on the Flask backend. In production, this must restrict `Access-Control-Allow-Origin` to the known frontend domain.

### Score Rationale

The foundational security hygiene is solid and correctly implemented. The missing authentication layer is a significant deduction because it represents a complete absence of user data protection in any deployed scenario.

**Score: 14 / 20**

---

## 3. Efficiency — 14 / 20

### Overview

The application makes sensible efficiency choices at the frontend rendering layer, but lacks backend-side performance infrastructure that would be necessary for production load.

### Strengths

- **Recharts lazy-loading pattern**: Charts are only rendered when the dashboard is mounted, avoiding upfront computation cost during the initial app load.
- **Framer Motion hardware-accelerated animations**: Animations use CSS `transform` and `opacity` properties, which are composited on the GPU and do not trigger layout reflow. This is the correct approach for smooth 60fps animations.
- **SQLAlchemy ORM query optimization**: The ORM layer abstracts database access in a way that avoids N+1 query patterns for the data volumes present in this application.
- **Vite proxy**: The Vite dev proxy eliminates cross-origin latency during development and simplifies the deployment model.

### Weaknesses

- **No Redis caching**: Gemini API calls are made on every calculation request. Caching responses for identical (or near-identical) footprint profiles would reduce latency and API costs substantially. There is no caching layer at any tier.
- **No pagination on the history endpoint**: `GET /api/dashboard/data` returns the full calculation history. As a user accumulates data, this payload will grow without bound, degrading response time and increasing bandwidth consumption.
- **Large JS bundle (~780KB)**: Reinforcing the Code Quality finding, the unoptimized bundle directly impacts Time to Interactive (TTI), a core efficiency metric. Route-level code splitting with React's `lazy()` + `Suspense` would address this.
- **SQLite in development**: SQLite is single-writer and not suitable for concurrent requests. In a multi-user production scenario, this would create bottlenecks. (Acknowledged as a future scope item.)

### Score Rationale

Frontend rendering efficiency is handled well. The backend lacks the caching and pagination infrastructure needed for production-scale performance. The bundle size penalty applies here as well as in Code Quality.

**Score: 14 / 20**

---

## 4. Testing — 12 / 20

### Overview

A pytest-based test suite exists and covers the most critical backend logic. However, test coverage is limited in both breadth and depth, and the frontend has no automated tests.

### Strengths

- **pytest test suite present**: Backend tests exist and are runnable via `pytest`. This is better than many hackathon submissions, which ship with zero tests.
- **Calculator logic tested**: The core CO₂ calculation functions — the most business-critical logic in the application — are covered by unit tests. Errors in this logic would produce incorrect carbon readings, making this coverage genuinely valuable.
- **Route-level tests**: API endpoint tests validate that routes respond with expected status codes and payload shapes for well-formed inputs.

### Weaknesses

- **No frontend unit tests**: There are no Vitest or Jest tests for React components. Key UI flows — the multi-step calculator state machine, form validation feedback, dashboard rendering with edge-case data — are entirely untested in an automated fashion.
- **No end-to-end (E2E) tests**: No Playwright or Cypress suite exists to validate the complete user journey (landing → calculator → submission → dashboard). E2E tests are the most valuable tests for catching integration regressions.
- **Coverage not measured**: There is no `pytest-cov` configuration or coverage threshold. It is unknown what percentage of the backend code paths are actually exercised by the existing tests.
- **No negative-case testing visible**: Tests for malformed inputs, missing required fields, and Gemini API failure scenarios are not clearly present.

### Score Rationale

The presence of a working test suite is a genuine positive. The score reflects the significant gap in frontend coverage and the absence of E2E or integration tests, which would be required to confidently ship this application.

**Score: 12 / 20**

---

## 5. Accessibility — 13 / 20

### Overview

EcoPilot makes meaningful accessibility efforts at the implementation level, but no formal audit has been performed and some areas remain unverified.

### Strengths

- **Semantic HTML structure**: Pages use appropriate HTML5 landmark elements (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`), which provide structure for screen reader navigation without requiring additional ARIA.
- **ARIA labels on icon-only buttons**: Buttons that contain only an icon (from Lucide React) include `aria-label` attributes, providing screen reader users with a text description of the action.
- **Keyboard navigation support**: Interactive elements (buttons, links, form inputs) are reachable and operable via keyboard-only navigation. No focus traps have been introduced.
- **Framer Motion `reduced-motion` awareness**: Framer Motion respects the `prefers-reduced-motion` media query by default, ensuring users who have configured this OS-level preference receive a non-animated experience.

### Weaknesses

- **Color contrast not systematically verified**: While TailwindCSS default color palette values generally meet WCAG 2.1 AA contrast requirements, this has not been verified with a tool (e.g., axe, Lighthouse) across all component states (hover, focus, disabled, error).
- **No screen reader audit**: The application has not been tested with a screen reader (NVDA, VoiceOver, JAWS). Dynamic content updates (e.g., the AI coaching text appearing after a calculation) may not be announced correctly without explicit `aria-live` regions.
- **Form field labels**: The multi-step calculator's form inputs need to be verified for proper `<label>` association via `htmlFor`/`id` pairing across all steps.

### Score Rationale

The foundational accessibility practices are present and correct. The score reflects that accessibility has been considered at implementation time but not validated — a meaningful distinction in a production context.

**Score: 13 / 20**

---

## Suggested Improvements

The following improvements are ranked by estimated impact-to-effort ratio:

### High Impact / Low Effort

1. **Add `pytest-cov` and enforce a coverage threshold** (e.g., 70%)  
   Command: `pytest --cov=. --cov-fail-under=70`

2. **Run Lighthouse or axe on the deployed frontend**  
   Identifies concrete contrast and ARIA issues in under 10 minutes.

3. **Add Flask-Limiter to the calculate endpoint**  
   ```python
   from flask_limiter import Limiter
   limiter = Limiter(app, default_limits=["10 per minute"])
   ```

4. **Configure explicit CORS on the Flask backend**  
   ```python
   from flask_cors import CORS
   CORS(app, origins=["https://your-frontend.vercel.app"])
   ```

### High Impact / Medium Effort

5. **Implement route-level code splitting in React**  
   ```jsx
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   ```
   Expected bundle size reduction: ~30–40%.

6. **Add Vitest + React Testing Library for the Calculator component**  
   Focus on the multi-step state machine and form validation.

7. **Add pagination to `/api/dashboard/data`**  
   ```
   GET /api/dashboard/data?page=1&per_page=20
   ```

### Medium Impact / High Effort

8. **Implement JWT authentication**  
   Flask-JWT-Extended is already architecturally anticipated. This unlocks per-user data persistence and transforms the demo into a real product.

9. **Add Redis caching for Gemini responses**  
   Cache by a hash of the footprint breakdown. TTL of 1 hour is appropriate.

10. **Write a Playwright E2E test suite**  
    Minimum: calculator submission flow and dashboard render test.

---

*This report was generated as part of the PromptWars hackathon internal review process. Scores are calibrated to reflect real-world engineering standards, not hackathon-adjusted curves.*
