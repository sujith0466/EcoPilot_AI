# Production Startup Report

## Production Initialization Lifecycle
When Render executes the Start Command (`cd backend && gunicorn "app:create_app()"`), the EcoPilot Flask application now undergoes the following strict initialization sequence:

1. **Environment Configuration**: `dotenv` parses the environment variables (e.g., `SECRET_KEY`, `FLASK_ENV=production`).
2. **Factory Boot**: Gunicorn invokes `create_app()`, allocating the Flask instance.
3. **Extension Binding**: SQLAlchemy, Flask-Migrate, CacheLib, and Limiter attach to the application.
4. **Schema Initialization (CRITICAL ADDITION)**: 
   * An application context (`app_context()`) is pushed.
   * `backend/models/__init__.py` is fully imported, guaranteeing `User`, `CarbonRecord`, and `Goal` classes are registered into SQLAlchemy's metadata.
   * `db.create_all()` is fired. SQLite safely performs `CREATE TABLE IF NOT EXISTS`, preventing overwrites on subsequent restarts while guaranteeing tables are ready for traffic.
5. **Route Binding**: Blueprints are attached, error handlers are mapped, and security headers are hooked into the middleware pipeline.
6. **Worker Ready**: Gunicorn accepts inbound connections.

## Seeding Safety Protocol
The application relies on a hardcoded demo user (`seed_demo_user()`) for Phase 3 evaluation. This script executes lazily (on the first dashboard or goal request) rather than at boot time.
* **If user exists**: It executes an efficient `.first()` lookup and returns the `demo_user` ID.
* **If user missing**: It injects the `demo_user` string into the `users` table and executes a safe `db.session.commit()`.

Because the schema initialization is now structurally decoupled from the route-level logic, the dashboard API is guaranteed to never experience a missing-table crash.
