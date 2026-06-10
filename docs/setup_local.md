# EcoPilot Local Setup Guide

Follow this guide to run the EcoPilot application locally. 

## Prerequisites
- Python 3.10+
- Git

## 1. Create a Virtual Environment
Navigate to the root directory and create an isolated environment:
```powershell
python -m venv venv
```

## 2. Activate Environment
**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```
**Mac/Linux:**
```bash
source venv/bin/activate
```

## 3. Install Dependencies
Install all required Python packages via pip:
```powershell
pip install -r requirements.txt
```

## 4. Environment Configuration
Create a `.env` file in the root directory (refer to `docs/env_setup.md` for specific variable requirements):
```powershell
cp .env.example .env
```

## 5. Initialize Database (Optional for testing, run automatically inside app_context usually)
```powershell
$env:FLASK_APP="backend.app:create_app()"
flask db upgrade
```

## 6. Start the Application
Run the local development server:
```powershell
$env:FLASK_APP="backend.app:create_app()"
$env:FLASK_ENV="development"
flask run
```

## 7. Access Browser
The server will boot on `http://127.0.0.1:5000`. Navigate to `/api/dashboard/data` to view the JSON output for the demo user!
