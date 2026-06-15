# API Contract

## Overview
The frontend and backend communicate using JSON payloads over REST. The following models define the exact structures.

## Models

### CarbonRecord
```json
{
  "id": 1,
  "total_monthly": 450.5,
  "estimated_annual": 5406.0,
  "carbon_score": 82,
  "impact_level": "Good",
  "calculated_at": "2026-06-12T10:40:13.265914Z"
}
```

### DashboardData
```json
{
  "username": "demo_user",
  "history": [/* CarbonRecords */],
  "analytics": {
    "monthly_avg": 310.4,
    "trend": "improving",
    "improvement_percentage": 5.2
  },
  "ai_coach": "Try taking the bus...",
  "gamification": {
    "level": 3,
    "streak_days": 5,
    "achievements": ["First Step"]
  },
  "latest_record": null,
  "recommendations": []
}
```

### API Wrapper
All endpoints return an overarching `APIResponse` object:
```json
{
  "status": "success",
  "data": { ... }
}
```
