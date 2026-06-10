# Local Environment Setup

Create a file named `.env` in the root of your project directory based on the following template. **Never commit the `.env` file to version control.**

```env
# Application Mode
# Use 'development' for local tracing, or 'production' to enable fail-fast security constraints.
FLASK_ENV=development

# Application Secrets
# The cryptographic key used for signing cookies and securely maintaining sessions.
# MUST be changed to a cryptographically secure random string in production.
SECRET_KEY=local-development-secret-key-do-not-use-in-production

# Database Configuration
# Local setup defaults to SQLite. To switch to PostgreSQL, swap the URI format.
DATABASE_URL=sqlite:///ecopilot_dev.db

# Caching
# SimpleCache is recommended for local development. Redis can be specified here in production.
CACHE_TYPE=SimpleCache
CACHE_DEFAULT_TIMEOUT=60
```
