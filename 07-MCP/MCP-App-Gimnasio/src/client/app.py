from __future__ import annotations

import json

import streamlit as st

from mcp_client import MCPOpsClient

st.set_page_config(page_title="MCP Gimnasio", page_icon="DUMBBELL", layout="wide")

st.title("MCP Gimnasio Assistant")
st.caption("Demo simple para la operacion diaria de un gimnasio boutique")

client = MCPOpsClient()

tabs = st.tabs(
    [
        "API: Clima",
        "API: Festivos",
        "Tool: Google Sheets",
        "Tool: Google Calendar",
        "Logica: Sesion",
        "Logica: Entrenadores",
    ]
)

with tabs[0]:
    st.subheader("Tool: `api_weather_forecast`")
    city = st.text_input("Ciudad", value="Madrid", key="weather_city")
    days = st.slider("Dias de pronostico", min_value=1, max_value=7, value=3)
    if st.button("Consultar clima"):
        with st.spinner("Llamando al MCP Server..."):
            result = client.call_tool("api_weather_forecast", {"city": city, "days": days})
        st.json(result)

with tabs[1]:
    st.subheader("Tool: `api_public_holidays`")
    country_code = st.text_input("Codigo pais", value="ES")
    year = st.number_input("Anio", min_value=2020, max_value=2035, value=2026, step=1)
    if st.button("Consultar festivos"):
        with st.spinner("Llamando al MCP Server..."):
            result = client.call_tool("api_public_holidays", {"country_code": country_code, "year": int(year)})
        st.json(result)

with tabs[2]:
    st.subheader("Tool: `tool_google_sheets_add_member`")
    member_name = st.text_input("Nombre socio", value="Ana Lopez")
    membership_plan = st.text_input("Plan", value="Mensual premium")
    phone = st.text_input("Telefono", value="600123123")
    if st.button("Registrar socio"):
        with st.spinner("Llamando al MCP Server..."):
            result = client.call_tool(
                "tool_google_sheets_add_member",
                {"member_name": member_name, "membership_plan": membership_plan, "phone": phone},
            )
        st.json(result)

with tabs[3]:
    st.subheader("Tool: `tool_google_calendar_create_session`")
    title = st.text_input("Titulo sesion", value="HIIT nivel intermedio")
    start_dt = st.text_input("Inicio (YYYY-MM-DD HH:MM)", value="2026-04-27 18:00")
    end_dt = st.text_input("Fin (YYYY-MM-DD HH:MM)", value="2026-04-27 19:00")
    coach = st.text_input("Entrenador", value="Carlos")
    if st.button("Crear sesion en calendario"):
        with st.spinner("Llamando al MCP Server..."):
            result = client.call_tool(
                "tool_google_calendar_create_session",
                {
                    "title": title,
                    "start_datetime": start_dt,
                    "end_datetime": end_dt,
                    "coach": coach,
                },
            )
        st.json(result)

with tabs[4]:
    st.subheader("Tool: `logic_recommend_session_focus`")
    weather_condition = st.selectbox("Condicion meteo", options=["frio", "lluvia", "templado", "calor"], index=2)
    expected_attendance = st.number_input("Asistencia esperada", min_value=1, value=40, step=1)
    indoor_slots_available = st.number_input("Zonas indoor disponibles", min_value=1, value=2, step=1)
    if st.button("Recomendar sesion"):
        with st.spinner("Llamando al MCP Server..."):
            result = client.call_tool(
                "logic_recommend_session_focus",
                {
                    "weather_condition": weather_condition,
                    "expected_attendance": int(expected_attendance),
                    "indoor_slots_available": int(indoor_slots_available),
                },
            )
        st.json(result)

with tabs[5]:
    st.subheader("Tool: `logic_plan_coach_staff`")
    day_type = st.selectbox("Tipo de dia", options=["laborable", "fin_de_semana", "festivo"], index=0)
    expected_attendance_staff = st.number_input("Asistencia esperada (turno)", min_value=1, value=55, step=1)
    session_hours = st.slider("Horas de sesion", min_value=1, max_value=4, value=2)
    if st.button("Planificar entrenadores"):
        with st.spinner("Llamando al MCP Server..."):
            result = client.call_tool(
                "logic_plan_coach_staff",
                {
                    "day_type": day_type,
                    "expected_attendance": int(expected_attendance_staff),
                    "session_hours": int(session_hours),
                },
            )
        st.json(result)

st.divider()
st.markdown("### Tools disponibles")
st.code(json.dumps(client.list_tools(), ensure_ascii=False, indent=2), language="json")
