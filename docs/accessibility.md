# Accessibility Strategy

## Overview
EcoPilot's frontend architecture is built with inclusivity and standard web accessibility guidelines in mind.

## Implemented Measures

1. **Semantic HTML5**
   - Use of `<header>`, `<main>`, `<nav>`, `<section>`, and `<footer>` to provide structural meaning.

2. **ARIA Roles and Attributes**
   - Clear `role="navigation"`, `role="banner"`, and `role="contentinfo"`.
   - Use of `aria-label` and `aria-labelledby` for context (e.g., buttons and sections).

3. **Keyboard Navigation**
   - "Skip to main content" link provided.
   - Interactive elements have highly visible `outline` styles in `style.css` for keyboard focus (`:focus`).

4. **Visual Design**
   - Color choices ensure high contrast (`--primary-color: #2E7D32` against light background).

## Next Steps
- Ensure all future forms have associated `<label>` elements.
- Conduct automated audits using tools like Axe or Lighthouse.
