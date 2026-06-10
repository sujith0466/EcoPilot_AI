# Component Architecture

To achieve a modular, Vanilla CSS framework mimicking Tailwind/Vercel paradigms, EcoPilot will utilize strict BEM-inspired utility and component classes.

## 1. Global Layout Wrappers
* `.app-container`: Max-width wrapper (e.g., `max-w-7xl`, `1280px`) with responsive padding.
* `.grid-dashboard`: A CSS Grid layout (`grid-template-columns: 1fr 3fr 1fr`) that collapses to `1fr` on mobile.

## 2. Core Components
* **`.premium-card`**: The fundamental building block. Implements glassmorphism, 1px subtle borders, border-radius (`16px`), and inner padding.
* **`.btn-primary`**: Vibrant gradient background (`linear-gradient(to right, #22c55e, #10b981)`), subtle text shadow, scale on active state.
* **`.btn-secondary`**: Outline or ghost button with text matching the background surface.
* **`.metric-card`**: A variation of `.premium-card` displaying a large numerical value, an accompanying Lucide Icon, and a colored trend indicator (e.g., `.text-success` or `.text-danger`).

## 3. Specialized Panels
* **`.ai-coach-panel`**: A vertical card featuring an avatar header (`.avatar-glow`), an animated typing cursor effect, and structured `.insight-pill` components.
* **`.progress-ring`**: An SVG-based circular progress bar used for the Carbon Score, utilizing `stroke-dasharray` and CSS `transition` for smooth loading.
* **`.achievement-badge`**: A rounded icon container with a locked state (grayscale, low opacity) and an unlocked state (full color, glowing box-shadow).

## 4. Animation Utility Classes
* **`.animate-fade-up`**: Initial state `opacity: 0; transform: translateY(20px);`. Triggered to `opacity: 1; transform: translateY(0);` via IntersectionObserver.
* **`.hover-lift`**: `transition: transform 0.2s; &:hover { transform: translateY(-4px); }`.
