# Phase 2 — SQLAlchemy Import Consistency

## Findings
The previous codebase had a major structural conflict leading to mixed imports.
1. The backend application itself (`app.py`, `services/*`, `routes/*`) used flat namespace imports starting from the `backend/` directory root (e.g., `from models.user import User`).
2. The `tests/` directory (specifically all 14 test files) used absolute package imports (e.g., `from backend.models.user import User`).

This dual-import structure resulted in **SQLAlchemy double-registration**. Because Python tracked `models` and `backend.models` as two separate packages via `sys.modules`, `User` and `CarbonRecord` models were evaluated and mapped by SQLAlchemy twice, resulting in:
`SAWarning: This declarative base already contains a class with the same class name and module name...`

## Fixes Implemented
1. Unified the import strategy to use the **backend flat namespace** uniformly across the entire project (both in source and in tests).
2. Refactored all test files, replacing `from backend.<module>` with `from <module>`.
3. Updated `pytest.ini` in the project root to include `backend` in the `pythonpath`, allowing test files to resolve flat imports natively without `PYTHONPATH` environment variable hacks.

## Verification
* `create_app()` instantiates cleanly without SQLAlchemy warnings.
* Double-registration errors during `pytest` collection are completely resolved.
* `python backend/run.py` starts the server correctly.
