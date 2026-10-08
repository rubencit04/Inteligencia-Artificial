import sqlite3
import json
from datetime import datetime

class MCPServerSQLite:
    def __init__(self, db_path: str = "metrics.db"):
        self.db_path = db_path
        self._initialize_db()

    def _initialize_db(self) -> None:
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS clean_code_metrics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT,
                    agent_name TEXT,
                    applied_principles JSON
                )
            ''')
            conn.commit()

    def log_metrics(self, agent_name: str, principles_json: str) -> bool:
        try:
            json.loads(principles_json)
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute(
                    'INSERT INTO clean_code_metrics (timestamp, agent_name, applied_principles) VALUES (?, ?, ?)',
                    (datetime.now().isoformat(), agent_name, principles_json)
                )
                conn.commit()
            print(f"[MCP Server] [OK] Métricas guardadas exitosamente por el agente: {agent_name}.")
            return True
        except json.JSONDecodeError:
            print("[MCP Server] [ERROR] Error: El agente no proporcionó un formato JSON válido.")
            return False

if __name__ == "__main__":
    mcp_server = MCPServerSQLite()
    datos_obtenidos_por_agente = '{"principios_aplicados": ["SRP", "Type Hints", "Docstrings"]}'
    print("MetricsCollectorAgent intentando conectar con MCP Server...")
    mcp_server.log_metrics(agent_name="MetricsCollectorAgent", principles_json=datos_obtenidos_por_agente)
