# Agentes con parámetros
from crewai import Agent, Task, Crew, Process, LLM
import os

# 0 cargamos y accedemos a las variables de entorno
from dotenv import load_dotenv

load_dotenv()

api_key_groq = os.getenv('API_KEY_GROQ')

# 1 Conectar con el modelo
llm = LLM (
    model="llama-3.3-70b-versatile",
    temperature=0.5,
    base_url="https://api.groq.com/openai/v1",
    api_key=api_key_groq
)

# 2 Definir Agentes
researcher= Agent (
    role="Experto Invetigador",
    goal="Descubre últimos avances y técnicas de {tema}",
    backstory="Eres el líder de un grupo de expertos."
              "Tu experiencia se centra en identificar nuevas tecnologías emergentes en {tema}. "
              "Tienes especial habilidad para analizar datos y presenar la información de manera brillante",
    allow_delegation=False,
    verbose=True,
    llm=llm
)

writer = Agent(
    role = "Creador de contenido tecnológico",
    goal="Crear contenido interesante sobre el ámbito de {tema}",
    backstory="Eres un reputado creador de contenido tecnológico que has elaborado artículos populares",
    allow_delegation=False,
    verbose=True,
    llm=llm
)

# 3 definir tareas
research = Task(
    description = (
        "1. Realiza un estudio profundo de los últimos avances en {tema} en los años 2024 y 2025 \n"
        "2. Identifica nuevas tecnologías, tendencias clave, y su impacto en las empresas"
    ),
    expected_output="Informe completo destacando los puntos claves",
    agent = researcher,
)

write = Task(
    description = (
        """Empleando la información proporcionada desarrolla una publicación 
        destacable sobre avances de {tema}.
        Tu publicación debe ser rigurosa e informativa pero accesible para todo el público
        con un conocimiento tecnológico.
        Haz que suene interesante para que despierte curiosidad.
        Evita palabaras complejas o estructuras repetitivas para que no suene a IA"""
    ),
    expected_output="Una publicación de calidad, de al menos 200 palabras",
    agent = writer
)

def launch_crew():
    crew = Crew(
        agents=[researcher, writer],
        tasks=[research, write],
        verbose=True
    )
    result = crew.kickoff(inputs={"tema": "Big Data"})
    print(result)