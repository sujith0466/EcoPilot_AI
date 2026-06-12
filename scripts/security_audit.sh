#!/bin/bash
set -e

echo "Running Security Audit..."

echo "--- 1. Bandit (Static Application Security Testing) ---"
bandit -r backend/ || echo "Bandit found potential issues."

echo "--- 2. Safety (Backend Dependency Vulnerability Scan) ---"
safety check -r requirements.txt || echo "Safety found vulnerable dependencies."

echo "--- 3. Pip-Audit (Backend Dependency Vulnerability Scan) ---"
pip-audit -r requirements.txt || echo "Pip-Audit found vulnerable dependencies."

echo "--- 4. NPM Audit (Frontend Dependency Vulnerability Scan) ---"
cd frontend && npm audit --audit-level=high || echo "NPM Audit found vulnerabilities."

echo "Security Audit Complete!"
