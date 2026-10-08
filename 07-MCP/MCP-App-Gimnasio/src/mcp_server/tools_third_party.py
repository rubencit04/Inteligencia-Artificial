from __future__ import annotations

from datetime import datetime
from typing import Any

import requests


def get_weather_forecast(city: str, days: int = 3) -> dict[str, Any]:
    """API de terceros: Open-Meteo (geocoding + forecast)."""
    days = max(1, min(days, 7))

    geo_resp = requests.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        params={"name": city, "count": 1, "language": "es", "format": "json"},
        timeout=20,
    )
    geo_resp.raise_for_status()
    geo_data = geo_resp.json()

    if not geo_data.get("results"):
        return {"ok": False, "error": f"No se encontró la ciudad '{city}'."}

    place = geo_data["results"][0]
    lat = place["latitude"]
    lon = place["longitude"]

    weather_resp = requests.get(
        "https://api.open-meteo.com/v1/forecast",
        params={
            "latitude": lat,
            "longitude": lon,
            "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum",
            "timezone": "auto",
            "forecast_days": days,
        },
        timeout=20,
    )
    weather_resp.raise_for_status()
    weather_data = weather_resp.json().get("daily", {})

    result_days = []
    for idx, date_str in enumerate(weather_data.get("time", [])):
        result_days.append(
            {
                "fecha": date_str,
                "t_max_c": weather_data.get("temperature_2m_max", [None])[idx],
                "t_min_c": weather_data.get("temperature_2m_min", [None])[idx],
                "lluvia_mm": weather_data.get("precipitation_sum", [None])[idx],
            }
        )

    return {
        "ok": True,
        "fuente": "Open-Meteo",
        "consulta_en": datetime.utcnow().isoformat() + "Z",
        "ciudad": place.get("name"),
        "pais": place.get("country"),
        "latitud": lat,
        "longitud": lon,
        "pronostico": result_days,
    }


def get_public_holidays(country_code: str = "ES", year: int | None = None) -> dict[str, Any]:
    """API de terceros: Nager.Date (festivos públicos)."""
    if year is None:
        year = datetime.utcnow().year
    code = country_code.upper().strip()
    resp = requests.get(
        f"https://date.nager.at/api/v3/PublicHolidays/{year}/{code}",
        timeout=20,
    )
    resp.raise_for_status()
    data = resp.json()

    holidays = []
    for item in data[:10]:
        holidays.append(
            {
                "fecha": item.get("date"),
                "nombre": item.get("localName"),
                "global": item.get("global"),
            }
        )

    return {
        "ok": True,
        "fuente": "Nager.Date",
        "pais": code,
        "anio": year,
        "total_festivos": len(data),
        "proximos_festivos": holidays,
    }
