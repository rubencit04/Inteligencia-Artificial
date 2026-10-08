from __future__ import annotations

import asyncio
import json
import os
from typing import Any

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


class MCPOpsClient:
    def __init__(self) -> None:
        server_module = os.getenv("MCP_SERVER_MODULE", "src.mcp_server.server")
        self.server_params = StdioServerParameters(
            command="python",
            args=["-m", server_module],
        )

    async def _call_tool_async(self, tool_name: str, arguments: dict[str, Any]) -> dict[str, Any]:
        async with stdio_client(self.server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                result = await session.call_tool(tool_name, arguments=arguments)
                return self._normalize_result(result)

    @staticmethod
    def _normalize_result(result: Any) -> dict[str, Any]:
        content = getattr(result, "content", None)
        if not content:
            return {"ok": False, "error": "El servidor devolvió una respuesta vacía."}

        for item in content:
            text = getattr(item, "text", None)
            if not text:
                continue

            try:
                parsed = json.loads(text)
                if isinstance(parsed, dict):
                    return parsed
                return {"ok": True, "data": parsed}
            except json.JSONDecodeError:
                return {"ok": True, "raw": text}

        return {"ok": True, "data": str(result)}

    def call_tool(self, tool_name: str, arguments: dict[str, Any]) -> dict[str, Any]:
        return asyncio.run(self._call_tool_async(tool_name, arguments))

    def list_tools(self) -> list[str]:
        return [
            "api_weather_forecast",
            "api_public_holidays",
            "tool_google_sheets_add_member",
            "tool_google_calendar_create_session",
            "logic_recommend_session_focus",
            "logic_plan_coach_staff",
        ]
