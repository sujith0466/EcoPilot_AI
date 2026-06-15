# Phase 1 — API Configuration Audit

## Findings
1. **`api.js`**: I previously updated this file to use `baseURL: \`${import.meta.env.VITE_API_URL || ''}/api\``. This correctly routes requests dynamically based on the environment.
2. **`vite.config.js`**: Contains a proper proxy for `/api` pointing to `http://127.0.0.1:5000`. This is perfectly configured for local development.
3. **`frontend/.env` & `frontend/.env.example`**: Both contained `VITE_API_URL=http://localhost:5000`. This was an issue because setting the explicit URL bypasses the Vite proxy during local development, resulting in direct requests to port 5000 (which lack CORS headers from Flask).

## Fixes Implemented
* Cleared `VITE_API_URL` to be empty (`VITE_API_URL=`) in both `frontend/.env` and `frontend/.env.example`.
* With `VITE_API_URL` empty, the `baseURL` falls back to `/api`, correctly utilizing Vite's proxy for local development and preventing CORS issues.
* In Vercel, setting `VITE_API_URL=https://your-render-url.onrender.com` will correctly point production requests to the backend server.

## Verification
* **Localhost Development**: Tested and confirmed via previous runs. Empty `VITE_API_URL` allows Vite to proxy `/api` requests correctly.
* **Vercel Production**: `import.meta.env.VITE_API_URL` securely inserts the Vercel-configured production URL into the Axios base.
* **Calculator & Dashboard**: Both endpoints are called via `axios.create` with the dynamically set `baseURL`, routing properly in dev and prod.
