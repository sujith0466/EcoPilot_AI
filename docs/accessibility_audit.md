# Phase 4 — Accessibility Improvements

## Findings
1. **Calculator Forms**: The `Calculator.jsx` had multiple form inputs and selects with labels, but none of the `<label>` tags were programmatically linked to their form controls using `htmlFor` and `id` pairs. This makes screen reader navigation difficult.
2. **Keyboard Navigation (Focus)**: Focus styles on buttons and inputs used standard generic `focus:` classes rather than `focus-visible:`, meaning mouse users would see focus rings when clicking, which is suboptimal UX.
3. **Skip to Main Content**: There was no "Skip to main content" link, making keyboard navigation tedious for users who have to tab through the navigation bar on every page load.

## Fixes Implemented
1. **Label Linking**: Updated all form fields in `Calculator.jsx` (`transport_mode`, `transport_distance`, `transport_days`, `electricity_units`, `food_diet`, `shopping_tier`, `waste_tier`) to have explicit `id` attributes matching their corresponding `<label htmlFor="...">`.
2. **Focus-Visible Styles**: Upgraded focus outlines from `focus:ring-2` to `focus-visible:ring-2` and `focus-visible:ring-offset-2` on buttons, inputs, and selects. This ensures focus rings only appear when navigating via keyboard.
3. **Skip to Main Content**: Added a visually hidden "Skip to main content" link as the first focusable element in `AppLayout.jsx`. It becomes visible when focused and scrolls directly to `<main id="main-content">`.

## Verification
* Form labels now successfully focus their respective inputs when clicked.
* Tabbing through the application shows clean `focus-visible` rings, while clicking buttons with a mouse remains ring-free.
* The "Skip to main content" link appears securely on first `Tab` press and skips navigation elements correctly.
