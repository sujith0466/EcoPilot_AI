# EcoPilot Backend API

This is the headless REST API backend for EcoPilot, built with Flask.
It serves as the data intelligence layer, completely decoupled from the frontend.

## How to Run

1. Ensure the virtual environment is activated.
2. From the `backend/` directory, simply run:
   ```bash
   python run.py
   ```
   OR
   ```bash
   flask run --host=127.0.0.1 --port=5000
   ```

## Directory Structure
- `routes/`: API endpoint definitions
- `services/`: Core business logic and integrations
- `validators/`: Incoming payload validation
- `models/`: Database schema definitions
- `utils/`: Helpers (seeding, logging, response formatting)
