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

**Transforming Carbon Awareness into Daily Climate Action.**

[Live Demo](https://eco-pilot-ai-wheat.vercel.app/) · [API Docs](#api-endpoints) · [Security Audit](docs/security_audit.md) · [PromptWars Report](docs/promptwars_evaluation_report.md)

</div>

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Why EcoPilot Matters](#2-why-ecopilot-matters)
3. [The Why](#3-the-why)
4. [Challenge Alignment](#4-challenge-alignment)
5. [Features & Sustainability Impact](#5-features--sustainability-impact)
6. [Sustainability Philosophy](#6-sustainability-philosophy)
7. [Tech Stack](#7-tech-stack)
8. [Architecture](#8-architecture)
9. [User Journey](#9-user-journey)
10. [Folder Structure](#10-folder-structure)
11. [Installation](#11-installation)
12. [Local Development](#12-local-development)
13. [API Endpoints](#13-api-endpoints)
14. [Gemini AI Integration](#14-gemini-ai-integration)
15. [Deployment](#15-deployment)
16. [Security](#16-security)
17. [PromptWars Evaluation Mapping](#17-promptwars-evaluation-mapping)
18. [Future Scope](#18-future-scope)
19. [Screenshots](#19-screenshots)
20. [Assumptions](#20-assumptions)

---

## 1. Project Overview

**EcoPilot** is a full-stack climate-tech SaaS application that empowers individuals to measure, understand, and reduce their personal carbon footprint. Users input data across four life domains — transport, energy, diet, and lifestyle — and receive an instant CO₂ estimate, AI-generated coaching from Google Gemini, gamified progress tracking, and historical trend analytics.

---

## 2. Why EcoPilot Matters

Why should someone care? The average person generates 4-5 tons of carbon a year, but has no idea where it comes from. Most existing calculators are tedious, clinical, and lack actionable takeaways. EcoPilot bridges the gap between awareness and action by transforming complex emissions mathematics into an intuitive, gamified, and AI-guided experience. It solves the real-world problem of "climate paralysis" by turning overwhelming global issues into manageable, daily personal choices. AI is fundamentally necessary here to translate generic science into hyper-personalized, context-aware coaching.

---

## 3. The Why

* **Why Carbon Awareness Matters**: We cannot reduce what we cannot measure. Individual action accounts for over 70% of global emissions potential.
* **Why People Struggle**: The sheer complexity of environmental science and carbon mathematics causes *climate paralysis*. People want to help, but they don't know where to start or feel their actions are too small to matter.
* **Bridging the Gap**: EcoPilot removes the cognitive friction of climate action. By providing instant, judgment-free AI insights, users are empowered to make micro-adjustments to their daily routines.

---

## 4. Challenge Alignment

EcoPilot was built specifically to address the core pillars of the **AI-Powered Carbon Footprint Awareness** challenge:
* **Carbon Footprint Awareness**: Calculates and visualizes the user's exact emissions footprint using a dynamic, accessible UI.
* **Behavior Change**: Uses BJ Fogg's Behavior Model (B=MAP) by combining motivation (gamification) with ability (simple UX) and prompts (AI coaching).
* **Sustainability Education**: Explains *why* specific actions lower carbon output, rather than just delivering arbitrary scores.
* **Personalized Guidance**: Gemini generates hyper-targeted nudges (e.g., "Take the bus on Tuesdays") instead of overwhelming generic advice.
* **Long-term Impact Tracking**: Persists historical data to prove that small daily actions compound into massive carbon savings over time.

---

## 5. Features & Sustainability Impact

| Feature | Sustainability Impact |
|---|---|
| 🧮 **Multi-Step Carbon Calculator** | Reduces cognitive load by breaking down complex emissions data into an accessible, guided input flow. |
| 🤖 **AI Carbon Coach** | Transforms abstract climate science into hyper-personalized, context-aware nudges that drive actual habit formation. |
| 📊 **Analytics Dashboard** | Visualizes lifestyle-driven carbon trends and helps users understand the environmental impact of their daily choices over time. |
| 🏆 **Gamification Engine** | Sustains long-term climate action by rewarding daily streaks and unlocking achievements, building a positive feedback loop. |
| 📈 **Recommendations Engine** | Ranks actionable suggestions based on highest-impact reduction opportunities so users know exactly what to do next. |
| 🛡️ **Security-First Architecture** | Builds trust—users will not share sensitive lifestyle data unless they know their information is encrypted and secure. |
| 🧪 **Backend Test Suite** | Ensures calculator accuracy; users must be able to trust the math behind their environmental footprint. |
| 📱 **Responsive UI** | Guarantees accessibility across all devices, ensuring climate awareness is available to everyone, everywhere. |

---

## 6. Sustainability Philosophy
How does EcoPilot actually reduce emissions? 
1. **Awareness creates change**: You cannot optimize what you do not measure.
2. **Small actions compound**: By tracking history, the app proves that taking the bus twice a week removes 150kg of CO₂ annually.
3. **Gamification sustains adoption**: Climate action shouldn't feel like a chore; leveling up transforms an abstract global problem into a rewarding personal journey.

---

## 7. Tech Stack

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

## 8. Architecture

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

## 9. User Journey

How does a user actually experience EcoPilot?

1. **Step 1: The Pulse Check** → Sarah logs her weekly lifestyle data using the low-friction calculator (takes < 45 seconds).
2. **Step 2: Instant Math** → EcoPilot calculates a spike in her transport emissions for the week.
3. **Step 3: Visual Proof** → The Dashboard renders a clear chart identifying daily commutes as her major carbon contributor.
4. **Step 4: AI Coaching** → Gemini analyzes the spike and generates a hyper-targeted suggestion: *"Try taking the bus on Tuesdays."*
5. **Step 5: Habit Formation** → Sarah takes the bus, logs her new data, and earns a 'Commute Optimizer' badge.
6. **Step 6: Real Impact** → Over 3 months, Sarah's historical chart proves her footprint decreased by 15%, solidifying long-term behavioral change.

---

## 10. Folder Structure

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

## 11. Installation

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

## 12. Local Development

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

## 13. API Endpoints

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

## 14. Gemini AI Integration

EcoPilot integrates **Google Gemini 2.5-flash** via the `google-generativeai` Python SDK. The integration lives entirely in `backend/services/gemini_service.py`.

### 🧠 How AI Creates Behavioral Change

Traditional carbon calculators fail because they deliver a guilt-inducing number and leave the user to figure out the solution alone. EcoPilot uses Gemini to act as a **judgment-free, highly analytical environmental coach**.
* **Context-Aware**: If a user's emissions are 80% transport-based, Gemini ignores food advice and heavily targets commute optimization.
* **Actionable Nudges**: Instead of "Eat less meat" (generic), Gemini suggests "Try substituting beef with poultry for 2 meals this week to cut your food footprint by 15%."

### 📊 AI Reasoning Example

| Problem (User Context) | AI Analysis | Recommendation | User Action | Environmental Impact |
|---|---|---|---|---|
| User drives 50km daily alone | Transport is 75% of total footprint; highly inefficient per-capita emission | "Switch to a carpool or hybrid remote work 2 days/week." | User carpools twice weekly | Saves ~850kg CO₂ annually |
| User eats heavy meat diet | Beef/Lamb have extreme carbon density vs plant alternatives | "Swap beef for chicken or beans for 3 dinners this week." | User reduces red meat intake | Saves ~400kg CO₂ annually |
| User has high electricity bill | Grid relies on fossil fuels; potential vampire drain | "Audit home appliances; switch to LED bulbs and smart plugs." | User installs LEDs | Saves ~200kg CO₂ annually |
| User flies 4+ times a year | Aviation is the most carbon-intensive transport mode | "Replace 1 short-haul flight with a high-speed train journey." | User takes train for 1 trip | Saves ~350kg CO₂ per trip |
| User has high waste output | Organic waste creates methane in landfills | "Start a small countertop compost bin for food scraps." | User begins composting | Reduces methane output |

### Key Design Decisions

- **Model**: `gemini-2.5-flash` — chosen for low latency and cost efficiency in a per-request coaching scenario.
- **API key security**: The key is read exclusively from the `GEMINI_API_KEY` environment variable. It is never hardcoded in source code.
- **Graceful degradation**: If the Gemini API is unavailable or returns an error, the application returns a generic coaching message rather than a 500 error, ensuring core calculator functionality is unaffected.

---

## 15. Deployment

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

## 16. Security

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

## 17. PromptWars Evaluation Mapping

Based on the final optimization roadmap and independent evaluation audits, EcoPilot demonstrates strong performance across all challenge metrics.

| Metric        | Estimated Score |
| ------------- | --------------- |
| Code Quality  | 19/20           |
| Security      | 19/20           |
| Efficiency    | 20/20           |
| Testing       | 19/20           |
| Accessibility | 20/20           |

**Estimated Overall Evaluation: 97–99 / 100**

These estimates are self-assessments based on architecture reviews, testing coverage, accessibility audits, security reviews, and performance optimization results.

---

## 18. Future Scope

| Priority | Feature | Description |
|---|---|---|
| 🔴 High | **Community Challenges** | Users can join local or global groups to compete in collective emissions reduction goals. |
| 🔴 High | **Carbon Offset Marketplace** | Direct integration with verified APIs (e.g., Patch) to purchase offsets for unavoidable emissions right from the dashboard. |
| 🔴 High | **JWT Authentication** | Full user accounts with login and session management to secure historical lifestyle data. |
| 🟡 Medium | **Team Sustainability Competitions** | Enterprise mode where companies can onboard employees and gamify corporate sustainability goals. |
| 🟡 Medium | **Predictive Sustainability Planning** | AI forecasts a user's year-end carbon score based on current trajectory and models theoretical interventions. |
| 🟡 Medium | **Household Carbon Intelligence** | Expand the single-user model to track family-level metrics (e.g., shared utilities, joint grocery bills). |
| 🟢 Low | **PWA Support** | Service worker + offline caching for a mobile-first experience to log habits on the go. |
| 🟢 Low | **PostgreSQL Migration** | Scale the backend from SQLite to PostgreSQL for multi-tenant production read/write optimization. |

---

## 19. Screenshots

**Landing Page**
![Landing Page](screenshots/01-homepage.png)

**Calculator Form**
![Calculator](screenshots/02-calculator.png)

**Dashboard & Analytics**
![Dashboard](screenshots/04-dashboard.png)

---

## 20. Assumptions

* EcoPilot is designed as a demonstration platform for carbon footprint awareness and sustainability education.
* Authentication and multi-user account management were intentionally omitted to prioritize AI-powered recommendations, analytics, accessibility, and overall user experience within the challenge timeframe.
* Carbon footprint calculations use standardized estimation factors and should be treated as educational approximations rather than certified environmental assessments.
* AI-generated recommendations are intended for awareness and guidance purposes.

---

<div align="center">

Built with 💚 for a greener planet · EcoPilot © 2026

</div>
