from __future__ import annotations

from datetime import datetime
from typing import Any


def add_member_to_google_sheets(member_name: str, plan: str, phone: str) -> dict[str, Any]:
    """Herramienta existente simulada: Google Sheets."""
    return {
        "ok": True,
        "modo": "simulado",
        "herramienta": "Google Sheets",
        "registro": {
            "id": "sim-sheets-001",
            "member_name": member_name,
            "plan": plan,
            "phone": phone,
            "created_at": datetime.utcnow().isoformat() + "Z",
        },
    }


def create_google_calendar_session(
    title: str,
    start_datetime: str,
    end_datetime: str,
    coach: str,
) -> dict[str, Any]:
    """Herramienta existente simulada: Google Calendar."""
    return {
        "ok": True,
        "modo": "simulado",
        "herramienta": "Google Calendar",
        "evento": {
            "id": "sim-calendar-001",
            "title": title,
            "start_datetime": start_datetime,
            "end_datetime": end_datetime,
            "coach": coach,
            "created_at": datetime.utcnow().isoformat() + "Z",
        },
    }

