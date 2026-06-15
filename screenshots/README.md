# EcoPilot Screenshots

All screenshots were captured programmatically using Puppeteer with a real Chromium browser session against the running Vite development server (`http://localhost:5174`). No AI-generated images, mockups, or placeholders were used.

**Capture date:** June 10, 2026  
**Viewport:** 1440×900 (desktop), 390×844 (mobile)  
**Device scale:** 2× (retina-equivalent)  
**Backend:** Flask running at `http://localhost:5000`

---

## Screenshots

### 01-homepage.png — Landing Page
The EcoPilot landing page with hero section, trust bar, features grid, community impact stats, and call-to-action. Captured at 1440×900 desktop viewport.

### 02-calculator.png — Carbon Calculator (Step 1)
The multi-step Carbon Calculator showing Step 1 (Transport). Displays the animated progress indicator, transport mode dropdown, daily distance and days-per-month inputs. Captured on the first step before any input changes.

### 03-calculator-results.png — Calculator Results
The calculation results view after submitting the form. Shows the radial CO₂ display, carbon score badge, impact level, and the full category breakdown grid (electricity, food, shopping, transportation, waste). Captured after a real API call to `/api/calculator/calculate`.

### 04-dashboard.png — Intelligence Dashboard
The main Analytics Dashboard view showing: welcome header with gamification level/streak badges, top metrics grid (latest footprint, monthly trend, total records), and the Emission Trends area chart with historical data. Captured from a session with 9 historical records.

### 05-ai-coach.png — AI Carbon Coach
The dashboard with focus on the AI Carbon Coach sidebar panel and Achievements section. The coach panel shows AI-generated insights from Gemini, and the achievements panel shows unlocked badges (Eco Starter, Green Performer) with a near-unlocked Consistency Hero achievement. Captured at 50% scroll depth.

### 06-mobile-view.png — Mobile Responsive View
The landing page at 390×844 viewport (iPhone 14 Pro dimensions). Shows the responsive layout with stacked navigation, hero text reflow, and mobile-optimized CTA buttons.
