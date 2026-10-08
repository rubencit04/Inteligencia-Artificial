from fastmcp import FastMCP
import os
from dotenv import load_dotenv

load_dotenv()

mcp=FastMCP(
    name="MCP Server saludicos",
    version="1.0.0"
)

@mcp.tool
def saludete() -> str:
    """Tool para saludar a Pepito Grillo"""
    nombre = "Pepito Grillo"
    return f"Hola {nombre}! Bienvenido a mi MCP Server de saludicos"

if __name__ == "__main__":
    print("Iniciando el MCP Server saludicos")
    mcp.run()