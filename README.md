# 🌿 EcoPilot — AI-Powered Carbon Footprint Tracker

<div align="center">

![EcoPilot Banner](https://img.shields.io/badge/EcoPilot-Climate%20Tech%20SaaS-22c55e?style=for-the-badge&logo=leaf&logoColor=white)

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?style=flat-square&logo=sqlite&logoColor=white)](https://sqlite.org/)
[![Google Gemini](https://img.shields.io/badge/Gemini-2.5--flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Track your carbon footprint. Get AI coaching. Live greener.**

[Live Demo](https://eco-pilot-ai-wheat.vercel.app/) · [API Docs](#api-endpoints) · [Security Audit](docs/security_audit.md) · [PromptWars Report](docs/promptwars_evaluation_report.md)

</div>

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Features](#3-features)
4. [Tech Stack](#4-tech-stack)
5. [Architecture](#5-architecture)
6. [Folder Structure](#6-folder-structure)
7. [Installation](#7-installation)
8. [Local Development](#8-local-development)
9. [API Endpoints](#9-api-endpoints)
10. [Gemini AI Integration](#10-gemini-ai-integration)
11. [Deployment](#11-deployment)
12. [Security](#12-security)
13. [PromptWars Evaluation Mapping](#13-promptwars-evaluation-mapping)
14. [Future Scope](#14-future-scope)
15. [Screenshots](#15-screenshots)
16. [Assumptions](#16-assumptions)

---

## 1. Project Overview

**EcoPilot** is a full-stack climate-tech SaaS application that empowers individuals to measure, understand, and reduce their personal carbon footprint. Users input data across four life domains — transport, energy, diet, and lifestyle — and receive an instant CO₂ estimate, AI-generated coaching from Google Gemini, gamified progress tracking, and historical trend analytics.

EcoPilot was built as a PromptWars hackathon submission demonstrating production-quality architecture, responsible AI integration, and security-conscious engineering practices.

---

## 2. Problem Statement

Individual carbon emissions account for a significant share of global greenhouse gas output, yet most people lack simple, actionable tools to understand their personal environmental impact. Existing solutions are often:

- **Too complex** — requiring extensive manual data entry
- **Too generic** — offering advice not tailored to the user's actual behavior
- **Not engaging** — no feedback loops to sustain behavior change

EcoPilot solves this with a guided multi-step calculator, real-time AI coaching personalized to the user's profile, and a gamification layer (achievements, streaks, levels) that drives ongoing engagement.

---

## 3. Features

| Feature | Description |
|---|---|
| 🧮 **Multi-Step Carbon Calculator** | Guided input across transport, energy, diet, and lifestyle categories |
| 🤖 **AI Carbon Coach** | Gemini 2.5-flash generates personalized reduction tips based on the user's specific footprint |
| 📊 **Analytics Dashboard** | Historical trend charts (Recharts), monthly breakdowns, and category comparisons |
| 🏆 **Gamification Engine** | Achievements, daily streaks, and level progression to sustain user engagement |
| 📈 **Recommendations Engine** | Ranked actionable suggestions based on highest-impact reduction opportunities |
| 🛡️ **Security-First Architecture** | Environment-based secrets, no hardcoded credentials, JWT-ready session design |
| 🧪 **Backend Test Suite** | pytest-based tests covering calculator logic and API routes |
| 📱 **Responsive UI** | TailwindCSS + Framer Motion animations; works across desktop and mobile |

---

## 4. Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [React](https://reactjs.org/) | 18.x | Component-based UI framework |
| [Vite](https://vitejs.dev/) | 5.x | Build tool & dev server with HMR |
| [TailwindCSS](https://tailwindcss.com/) | 3.x | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | 11.x | Hardware-accelerated animations |
| [Recharts](https://recharts.org/) | 2.x | Composable chart library |
| [Lucide React](https://lucide.dev/) | latest | Accessible SVG icon set |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| [Python](https://python.org/) | 3.x | Runtime |
| [Flask](https://flask.palletsprojects.com/) | 3.x | Lightweight WSGI web framework |
| [SQLAlchemy](https://www.sqlalchemy.org/) | 2.x | ORM & database abstraction |
| [SQLite](https://sqlite.org/) | 3.x | Embedded relational database (dev) |
| [pytest](https://pytest.org/) | 8.x | Test runner |

### AI & Cloud

| Technology | Purpose |
|---|---|
| [Google Gemini 2.5-flash](https://ai.google.dev/) | LLM for personalized carbon coaching |
| [Vercel](https://vercel.com/) | Frontend hosting (production) |
| [Render](https://render.com/) | Backend hosting (production) |

---

## 5. Architecture

```
┌─────────────────────────────────────────────────────┐
│                   User Browser                       │
│           React + Vite  (localhost:5173)              │
└───────────────────────┬─────────────────────────────┘
                        │  /api/* (Vite proxy)
                        ▼
┌─────────────────────────────────────────────────────┐
│               Flask Backend (localhost:5000)          │
│                                                       │
│   ┌────────────┐  ┌──────────────┐  ┌─────────────┐ │
│   │  main.py   │  │calculator.py │  │dashboard.py │ │
│   │ /api/health│  │  /calculate  │  │   /data     │ │
│   └────────────┘  └──────┬───────┘  └──────┬──────┘ │
│                           │                 │         │
│                    ┌──────▼─────────────────▼──────┐ │
│                    │      Services Layer             │ │
│                    │  gemini_service.py              │ │
│                    └──────────────┬────────────────┘ │
│                                   │                   │
│                    ┌──────────────▼────────────────┐ │
│                    │   SQLAlchemy ORM + SQLite DB    │ │
│                    └────────────────────────────────┘ │
└─────────────────────────────────┬───────────────────┘
                                  │  google-generativeai SDK
                                  ▼
                    ┌─────────────────────────────┐
                    │   Google Gemini 2.5-flash    │
                    │   (AI coaching responses)    │
                    └─────────────────────────────┘
```

### Request Flow

1. User completes the multi-step calculator in the React frontend
2. Frontend POSTs form data to `/api/calculator/calculate` via the Vite proxy
3. Flask validates input, calculates CO₂ totals, persists to SQLite
4. `gemini_service.py` sends the user's footprint profile to Gemini and returns coaching text
5. Response (CO₂ total + AI advice) is returned to the frontend
6. Dashboard fetches `/api/dashboard/data` for history, analytics, achievements, and recommendations

---

## 6. Folder Structure

```
EcoPilot/
│
├── backend/
│   ├── app.py                  # Application factory (create_app)
│   ├── config.py               # Environment-based configuration classes
│   ├── run.py                  # Entrypoint: python run.py
│   ├── routes/
│   │   ├── main.py             # GET / — health check
│   │   ├── calculator.py       # POST /api/calculator/calculate
│   │   └── dashboard.py        # GET /api/dashboard/data
│   ├── services/
│   │   └── gemini_service.py   # Gemini API integration
│   ├── models/                 # SQLAlchemy models
│   ├── validators/             # Input validation logic
│   ├── utils/                  # Shared utilities
│   ├── tests/                  # pytest test suite
│   ├── requirements.txt
│   └── .env                    # ⚠️ Never commit — excluded by .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx     # Hero / marketing page
│   │   │   ├── Calculator.jsx  # Multi-step carbon calculator
│   │   │   └── Dashboard.jsx   # Analytics & gamification dashboard
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── animations/
│   │   │   │   └── FadeIn.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── services/
│   │   │   └── api.js          # Centralized Axios/fetch API layer
│   │   └── App.jsx             # Router + top-level layout
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js          # Vite proxy: /api/* → localhost:5000
│   └── tailwind.config.js
│
├── docs/
│   ├── promptwars_evaluation_report.md
│   └── security_audit.md
│
├── .gitignore
└── README.md
```

---

## 7. Installation

### Prerequisites

- **Node.js** ≥ 18.x and **npm** ≥ 9.x
- **Python** ≥ 3.10
- A **Google Gemini API key** (free tier available at [Google AI Studio](https://aistudio.google.com/))

### Clone the Repository

```bash
git clone https://github.com/<your-username>/EcoPilot.git
cd EcoPilot
```

### Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
copy .env.example .env        # Windows
# cp .env.example .env        # macOS / Linux

# Edit .env and fill in your values (see Environment Variables section)
```

### Frontend Setup

```bash
cd frontend
npm install
```

---

## 8. Local Development

### Environment Variables

Create `backend/.env` from the provided `.env.example`:

```env
FLASK_APP=app:create_app
FLASK_ENV=development
FLASK_DEBUG=1
SECRET_KEY=<replace-with-a-strong-random-secret>
DATABASE_URL=sqlite:///ecopilot_dev.db
GEMINI_API_KEY=<your-google-gemini-api-key>
GEMINI_MODEL=gemini-2.5-flash
```

> [!CAUTION]
> Never commit `.env` to version control. It is already listed in `.gitignore`. Rotate your `GEMINI_API_KEY` if it has appeared in any terminal output or logs.

### Start the Backend

```bash
cd backend
# Activate venv if not already active
python run.py
# Flask runs at http://localhost:5000
```

### Start the Frontend

```bash
cd frontend
npm run dev
# Vite dev server runs at http://localhost:5173
# All /api/* requests are proxied to http://localhost:5000
```

### Run Tests

```bash
cd backend
pytest
# Or with verbose output:
pytest -v
```

---

## 9. API Endpoints

### Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "service": "EcoPilot API"
}
```

---

### Calculate Carbon Footprint

```http
POST /api/calculator/calculate
Content-Type: application/json
```

**Request Body:**

| Field | Type | Description |
|---|---|---|
| `transport_mode` | `string` | `"car"`, `"bus"`, `"train"`, `"flight"`, `"bike"`, `"walk"` |
| `transport_distance` | `number` | Daily commute distance in km |
| `transport_days` | `number` | Commute days per week |
| `electricity_units` | `number` | Monthly electricity consumption (kWh) |
| `food_diet` | `string` | `"vegan"`, `"vegetarian"`, `"omnivore"`, `"heavy_meat"` |
| `shopping_tier` | `string` | `"minimal"`, `"moderate"`, `"heavy"` |
| `waste_tier` | `string` | `"low"`, `"medium"`, `"high"` |

**Response:**
```json
{
  "total_co2_kg": 342.7,
  "breakdown": {
    "transport": 180.2,
    "energy": 85.1,
    "food": 55.4,
    "lifestyle": 22.0
  },
  "ai_coaching": "Based on your profile, switching to public transit twice a week could reduce your footprint by ~18%...",
  "category": "medium"
}
```

---

### Dashboard Data

```http
GET /api/dashboard/data
```

**Response:**
```json
{
  "history": [...],
  "analytics": { "monthly_avg": 310.4, "trend": "improving" },
  "ai_coach": "...",
  "gamification": {
    "level": 3,
    "streak_days": 7,
    "achievements": [...]
  },
  "recommendations": [...]
}
```

---

## 10. Gemini AI Integration

EcoPilot integrates **Google Gemini 2.5-flash** via the `google-generativeai` Python SDK. The integration lives entirely in `backend/services/gemini_service.py`.

### How It Works

1. After a carbon calculation is completed, the user's footprint breakdown (transport, energy, food, lifestyle) is serialized into a structured prompt.
2. The prompt asks Gemini to act as a personal carbon coach and provide 3–5 specific, actionable recommendations tailored to the user's highest-emission categories.
3. The response is returned as part of the `/api/calculator/calculate` response payload and also surfaced in the Dashboard's AI Coach widget.

### Key Design Decisions

- **Model**: `gemini-2.5-flash` — chosen for low latency and cost efficiency in a per-request coaching scenario.
- **API key security**: The key is read exclusively from the `GEMINI_API_KEY` environment variable. It is never hardcoded in source code.
- **Graceful degradation**: If the Gemini API is unavailable or returns an error, the application returns a generic coaching message rather than a 500 error, ensuring core calculator functionality is unaffected.

---

## 11. Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build          # Produces dist/
# Push to GitHub and connect the repo in Vercel dashboard
# Set VITE_API_BASE_URL to your Render backend URL
```

### Backend → Render

1. Create a new **Web Service** on [Render](https://render.com/)
2. Connect your GitHub repo; set **Root Directory** to `backend`
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `gunicorn "app:create_app()"`
5. Add all environment variables from `.env` under **Environment** in the Render dashboard

> [!IMPORTANT]
> Switch `DATABASE_URL` to a persistent PostgreSQL instance (e.g., Render Postgres or Supabase) for production. SQLite is not suitable for multi-instance deployment.

---

## 12. Security

| Control | Status | Notes |
|---|---|---|
| API keys via environment variables | ✅ Implemented | `GEMINI_API_KEY`, `SECRET_KEY` read from `os.environ` |
| `.env` excluded from git | ✅ Implemented | Listed in `.gitignore` |
| No hardcoded credentials in source | ✅ Verified | See [Security Audit](docs/security_audit.md) |
| Input validation on backend | ✅ Implemented | Validators in `backend/validators/` |
| JWT authentication | ⏳ Planned | Demo mode only; architecture is JWT-ready |
| Rate limiting | ⏳ Planned | Flask-Limiter integration planned |
| HTTPS enforcement | ⏳ Production only | Enforced by Vercel/Render in production |
| CORS configuration | ⏳ Production only | Restrict origins before production launch |

> [!WARNING]
> If your `GEMINI_API_KEY` has appeared in any terminal output or was pasted into a chat during development, rotate it immediately at [Google AI Studio](https://aistudio.google.com/) before making this repository public.

For a full security assessment, see [`docs/security_audit.md`](docs/security_audit.md).

---

## 13. PromptWars Evaluation Mapping

EcoPilot was designed with the PromptWars evaluation rubric as a guiding framework:

| Criterion | Key Implementations | Score |
|---|---|---|
| **Code Quality** | React component isolation, ErrorBoundary, null-safe patterns, clean API service layer | 16/20 |
| **Security** | Env-var secrets, `.gitignore` enforcement, no hardcoded credentials, input validation | 14/20 |
| **Efficiency** | Recharts lazy-loading, Framer Motion GPU animations, SQLAlchemy ORM | 14/20 |
| **Testing** | pytest suite covering calculator logic and routes | 12/20 |
| **Accessibility** | Semantic HTML, ARIA labels on icon-only buttons, keyboard navigation | 13/20 |
| | **Total** | **69/100** |

For detailed scoring rationale and improvement recommendations, see [`docs/promptwars_evaluation_report.md`](docs/promptwars_evaluation_report.md).

---

## 14. Future Scope

| Priority | Feature | Description |
|---|---|---|
| 🔴 High | **JWT Authentication** | Full user accounts with login, registration, and session management |
| 🔴 High | **Rate Limiting** | Flask-Limiter middleware on all API routes |
| 🔴 High | **PostgreSQL Migration** | Replace SQLite with PostgreSQL for production multi-tenancy |
| 🟡 Medium | **Frontend Unit Tests** | Vitest + React Testing Library for component coverage |
| 🟡 Medium | **E2E Tests** | Playwright test suite covering the full calculator → dashboard flow |
| 🟡 Medium | **Redis Caching** | Cache Gemini responses and dashboard data to reduce latency and API costs |
| 🟡 Medium | **Pagination** | Paginate `/api/dashboard/data` history endpoint |
| 🟢 Low | **Code Splitting** | Dynamic imports to reduce the initial JS bundle below 400KB |
| 🟢 Low | **PWA Support** | Service worker + offline caching for mobile-first experience |
| 🟢 Low | **Carbon Offset Marketplace** | Integrate with a verified carbon offset API for in-app purchases |
| 🟢 Low | **Social Sharing** | Share achievement cards and footprint scores on social media |
| 🟢 Low | **Accessibility Audit** | Full screen reader audit and WCAG 2.1 AA compliance verification |

---

## 15. Screenshots

**Landing Page**
![Landing Page](screenshots/01-homepage.png)

**Calculator Form**
![Calculator](screenshots/02-calculator.png)

**Dashboard & Analytics**
![Dashboard](screenshots/04-dashboard.png)

---

## 16. Assumptions

* EcoPilot is designed as a demonstration platform for carbon footprint awareness and sustainability education.
* Authentication and multi-user account management were intentionally omitted to prioritize AI-powered recommendations, analytics, accessibility, and overall user experience within the challenge timeframe.
* Carbon footprint calculations use standardized estimation factors and should be treated as educational approximations rather than certified environmental assessments.
* AI-generated recommendations are intended for awareness and guidance purposes.

---

<div align="center">

Built with 💚 for a greener planet · EcoPilot © 2026

</div>
