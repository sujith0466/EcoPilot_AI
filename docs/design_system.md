# EcoPilot Design System

## 1. Typography
* **Font Family:** `Inter`, sans-serif (weights: 400, 500, 600, 700)
* **Headings:** High contrast, tight tracking (letter-spacing: -0.02em).
* **Body:** Optimized for readability (line-height: 1.6).

## 2. Color Palette (CSS Variables)

**Primary (Eco-Green):**
* `--color-primary-500`: `#22c55e`
* `--color-primary-600`: `#16a34a`

**Secondary/Dark Mode Base (SaaS Slate):**
* `--color-bg-dark`: `#0f172a`
* `--color-surface-dark`: `#1e293b`
* `--color-border-dark`: `#334155`

**Text Colors:**
* `--color-text-main`: `#f8fafc` (Light on Dark) / `#0f172a` (Dark on Light)
* `--color-text-muted`: `#94a3b8` (Light) / `#64748b` (Dark)

**Accent:**
* `--color-accent-light`: `#84cc16`
* `--color-accent-teal`: `#34d399`

## 3. Shadows & Depth
* **Soft Shadow:** `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
* **Hover Lift Shadow:** `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
* **Glassmorphism:** `background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1);`

## 4. Animation Timings
* **Fast/UI:** `150ms ease-in-out` (Button hovers, input focus)
* **Medium/Entrance:** `300ms cubic-bezier(0.4, 0, 0.2, 1)` (Fade-ups, modal reveals)
* **Slow/Hero:** `800ms ease-out` (Page load floating elements)

## 5. Layout Spacing (8pt Grid)
* `--space-2`: `0.5rem` (8px)
* `--space-4`: `1rem` (16px)
* `--space-6`: `1.5rem` (24px)
* `--space-8`: `2rem` (32px)
* `--space-12`: `3rem` (48px)
