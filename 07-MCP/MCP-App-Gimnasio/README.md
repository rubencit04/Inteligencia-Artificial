# MCP Server + App Cliente (Gimnasio)

Proyecto simple para la practica de:
- analisis y consultoria IA,
- implementacion de MCP Server propio,
- integracion en aplicacion cliente.

## 1) Ambito de negocio
Se ha elegido un **gimnasio boutique**.

## 2) Tools implementadas (6)
### APIs de terceros
1. `api_weather_forecast` (Open-Meteo).
2. `api_public_holidays` (Nager.Date).

### APIs de herramientas existentes
1. `tool_google_sheets_add_member` (Google Sheets, simulado).
2. `tool_google_calendar_create_session` (Google Calendar, simulado).

### Logica propia
1. `logic_recommend_session_focus`.
2. `logic_plan_coach_staff`.

## 3) Instalacion
```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Opcional:
```bash
copy .env.example .env
```

No hace falta configurar webhooks.

## 4) Ejecucion de la app integrada
```bash
streamlit run src/client/app.py
```
