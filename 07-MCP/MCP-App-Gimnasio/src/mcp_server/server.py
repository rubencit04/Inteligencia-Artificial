from __future__ import annotations

from mcp.server.fastmcp import FastMCP

from .tools_custom import plan_coach_staff, recommend_session_focus
from .tools_existing import add_member_to_google_sheets, create_google_calendar_session
from .tools_third_party import get_public_holidays, get_weather_forecast

mcp = FastMCP("gym-operations-mcp")


@mcp.tool()
def api_weather_forecast(city: str, days: int = 3) -> dict:
    """Obtiene pronostico del tiempo para planificar sesiones (Open-Meteo)."""
    return get_weather_forecast(city=city, days=days)


@mcp.tool()
def api_public_holidays(country_code: str = "ES", year: int | None = None) -> dict:
    """Consulta festivos publicos para planificar asistencia (Nager.Date)."""
    return get_public_holidays(country_code=country_code, year=year)


@mcp.tool()
def tool_google_sheets_add_member(member_name: str, membership_plan: str, phone: str) -> dict:
    """Registra socio en Google Sheets (real o simulado)."""
    return add_member_to_google_sheets(member_name=member_name, plan=membership_plan, phone=phone)


@mcp.tool()
def tool_google_calendar_create_session(
    title: str,
    start_datetime: str,
    end_datetime: str,
    coach: str,
) -> dict:
    """Crea sesion en Google Calendar (real o simulado)."""
    return create_google_calendar_session(
        title=title,
        start_datetime=start_datetime,
        end_datetime=end_datetime,
        coach=coach,
    )


@mcp.tool()
def logic_recommend_session_focus(
    weather_condition: str,
    expected_attendance: int,
    indoor_slots_available: int,
) -> dict:
    """Recomienda enfoque de sesion para el gimnasio."""
    return recommend_session_focus(
        weather_condition=weather_condition,
        expected_attendance=expected_attendance,
        indoor_slots_available=indoor_slots_available,
    )


@mcp.tool()
def logic_plan_coach_staff(day_type: str, expected_attendance: int, session_hours: int = 2) -> dict:
    """Planifica entrenadores recomendados por turno."""
    return plan_coach_staff(day_type=day_type, expected_attendance=expected_attendance, session_hours=session_hours)


if __name__ == "__main__":
    mcp.run()
