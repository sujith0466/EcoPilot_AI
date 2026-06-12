# Frontend Documentation

## Stack Overview
* React 18
* Vite
* TailwindCSS
* Framer Motion
* Recharts
* TypeScript

## Architecture Philosophy
The frontend follows a strict separation of concerns:
* `pages/`: Smart components orchestrating layouts and data fetching.
* `components/`: Dumb, presentational UI components.
* `services/`: Axios wrappers for API integration.
* `types/`: Global TypeScript domain models defining the API contract.

## State Management
We rely on React Hooks natively. Data fetching occurs within custom hooks (e.g. `useDashboardData`) to prevent UI blocking.
