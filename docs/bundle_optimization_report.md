# Phase 5 — Bundle Optimization

## Findings
The frontend bundle previously compiled into a single massive JavaScript file. This causes:
1. Long initial load times (Time to Interactive).
2. Cache invalidation across all dependencies anytime application code changes.
3. Suboptimal chunking for dynamic or lazy-loaded routes.

## Fixes Implemented
Modified `vite.config.js` to define specific manual chunks in `build.rollupOptions.output`. This groups third-party libraries logically and creates cache-friendly assets:
1. `vendor`: Contains Core React (`react`, `react-dom`, `react-router-dom`).
2. `ui`: Contains styling and icons (`framer-motion`, `lucide-react`).
3. `charts`: Contains charting components (`recharts`).

## Verification
Running `npm run build` verifies the changes with zero errors. The chunk analysis shows distinct, optimized bundles:
* `charts-*.js`: 342 kB (101 kB gzip)
* `vendor-*.js`: 236 kB (77 kB gzip)
* `ui-*.js`: 125 kB (40 kB gzip)
* `index-*.js`: 78 kB (25 kB gzip)

This ensures the user's browser can cache `vendor`, `ui`, and `charts` effectively, so subsequent visits or application updates only require re-downloading the small 78 kB `index` chunk.
