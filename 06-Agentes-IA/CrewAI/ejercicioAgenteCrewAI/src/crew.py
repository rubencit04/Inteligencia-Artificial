import os
import yaml
from crewai import Agent, Task, Crew, Process
from crewai import LLM
from src.tools.custom_tool import ContadorPalabrasTool, AnalisisSentimientoTool

# --- CARGA DE CONFIGURACIÓN ---
def load_config(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return yaml.safe_load(file)

agents_config = load_config('src/config/agents.yaml')
tasks_config = load_config('src/config/tasks.yaml')

# --- CHATGPT MANAGER ---
# Usamos GPT-4o para máxima calidad y soporte jerárquico
chatgpt_manager = LLM(
    model=os.getenv("MODEL"),
    temperature=0.7,
    api_key=os.getenv("OPENAI_API_KEY")
)

# --- AGENTES ---
# Instanciamos las tools
contador_tool = ContadorPalabrasTool()
sentimiento_tool = AnalisisSentimientoTool()

# Nota: Usamos las nuevas claves 'documentalista' y 'guionista' del YAML
agente_doc = Agent(
    config=agents_config['documentalista'],
    verbose=True,
    allow_delegation=False,
    llm=chatgpt_manager
)

agente_guion = Agent(
    config=agents_config['guionista'],
    verbose=True,
    allow_delegation=False,
    tools=[contador_tool, sentimiento_tool], # Le damos AMBAS herramientas
    llm=chatgpt_manager
)

# --- TAREAS ---
tarea_buscar = Task(
    config=tasks_config['busqueda_datos'],
    agent=agente_doc
)

tarea_escribir = Task(
    config=tasks_config['redaccion_guion'],
    agent=agente_guion
)

# --- CREW ---
def mi_crew():
    crew = Crew(
        agents=[agente_doc, agente_guion],
        tasks=[tarea_buscar, tarea_escribir],
        process=Process.hierarchical, 
        manager_llm=chatgpt_manager,
        verbose=True
    )
    return crew