# Backend Documentation

## Stack Overview
* Python 3
* Flask (WSGI Web Framework)
* SQLAlchemy (ORM)
* SQLite / PostgreSQL
* google-generativeai

## Architecture Philosophy
The backend uses the Application Factory pattern (`app.py:create_app()`) to support different testing/production configurations.
* `routes/`: Blueprint controllers containing only input validation and HTTP responses.
* `services/`: Business logic, AI integrations, and heavy DB queries.
* `models/`: SQLAlchemy data definitions.
* `validators/`: Defensive typing and request sanitation.

## Database Initialization
On boot, `db.create_all()` is executed inside the app context, allowing zero-config deployment on Render without needing explicit migration containers.
