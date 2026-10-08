from __future__ import annotations

from datetime import date
from typing import Any


def recommend_session_focus(
    weather_condition: str,
    expected_attendance: int,
    indoor_slots_available: int,
) -> dict[str, Any]:
    """Logica propia: recomienda tipo de sesion del dia."""
    condition = weather_condition.lower().strip()
    if condition in {"lluvia", "frio"}:
        indoor_factor = 1.0
        focus = "entrenamiento_funcional_indoor"
    elif condition in {"calor", "soleado"}:
        indoor_factor = 0.7
        focus = "cardio_suave_indoor"
    else:
        indoor_factor = 0.85
        focus = "sesion_mixta"

    projected_indoor = max(1, int(expected_attendance * indoor_factor))
    capacity = max(1, indoor_slots_available * 20)
    risk = "bajo" if projected_indoor <= capacity else "medio"

    return {
        "ok": True,
        "weather_condition": condition,
        "recommended_focus": focus,
        "projected_indoor_attendance": projected_indoor,
        "indoor_capacity": capacity,
        "operational_risk": risk,
    }


def plan_coach_staff(day_type: str, expected_attendance: int, session_hours: int = 2) -> dict[str, Any]:
    """Logica propia: calcula entrenadores y apoyo por turno."""
    multiplier = 1.0
    if day_type.lower() in {"fin_de_semana", "festivo"}:
        multiplier = 0.9

    adjusted_attendance = int(expected_attendance * multiplier)
    athletes_per_coach = max(8, int(16 * (session_hours / 2)))
    coaches_needed = max(1, round(adjusted_attendance / athletes_per_coach))
    support_needed = max(0, round(coaches_needed * 0.3))

    return {
        "ok": True,
        "generated_on": str(date.today()),
        "day_type": day_type,
        "session_hours": session_hours,
        "expected_attendance_adjusted": adjusted_attendance,
        "coaches_needed": coaches_needed,
        "support_needed": support_needed,
    }

