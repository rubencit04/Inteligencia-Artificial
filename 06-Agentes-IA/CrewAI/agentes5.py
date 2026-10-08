# Flujo de procesos jerárquico
from crewai import Agent, Task, Crew, Process, LLM
from crewai_tools import ScrapeWebsiteTool
import os

# 0 cargamos y accedemos a las variables del .env
from dotenv import load_dotenv

load_dotenv()

api_key_groq = os.getenv("API_KEY_GROQ")

# 1 Conectamos al modelo
llm = LLM(
    model="llama-3.3-70b-versatile",
    temperature=0.5,
    base_url="https://api.groq.com/openai/v1",
    api_key=api_key_groq
)


# Agentes
# 1 Director (nivel más alto de la jerarquía)
director_investigacion = Agent(
    role = "Director de Investigación de Mercado",
    goal= "Supervisar y coordinar todo el proceso de investigación de mercado,"
          "asegurando que se cumplan los objetivos estratégicos",
    backstory = "Eres un experto director con m´sd de 15 años de experiencia en investigación de mercado"
                "Tu expertise es está en diseñar estrategias de investigación y sintentizar"
                "información compleja de manera adecuada para ayudar a la toma de decisiones",
    verbose=True,
    allow_delegation=True,
    llm=llm,
    max_iter=3,
    max_rpm=10,
)

# 2 Investigador senior
investigador_senior = Agent(
    role="Investigador senior de mercado",
    goal="Conducir las investigaciones y analizar datos "
         "y preparar reportes detallados para el Director de Investigación de Mercado",
    backstory = "Eres un investigador meticuloso con 8 años de experiencia en análisis de mercado"
                "Te especializas en metodologías cualitativas y cuantitativas"
                "y tienes una habilidad especial en fijarte en los detalles",
    
    verbose=True,
    allow_delegation=True,
    llm=llm,
    max_iter=5,
    max_rpm=15
)

# 3 Investigador Junior
investigador_junior = Agent(
    role="Investigador junior de mercados",
    goal = "Recopilar datos, realizar tareas básicas, "
           " y preparar resúmenes iniciales para el Investigador senior de mercado",
    backstory="Eres un investigador con dos años de experiencia"
                "Eres excelente en recopilar iniformación y en organizar datos de manera estructurada",
     verbose=True,
    allow_delegation=False,
    llm=llm,
    max_iter=7,
    max_rpm=20
)

# Tareas
#1 Definir estrategia (Director --> Invest. Senior)
tarea_estrategia = Task(
    description="Definir la estrategia de investigación para estudia el mercado "
                "de vehículos eléctricos en los años 2024 y 2025. Identifica los objetivos clave"
                " y las metodologías a utilizar"
                "El producto debe ser un documento de 2 o 3 páginas con la estrategia a seguir",
    agent=director_investigacion,
    expected_output="Documento estratégico con: 1) Objetivos claros, 2) Metologías propuestas,"
                                                "3) Time-Line",
    async_execution=False
)

# 2 Invetigación de mercado (Senior -> Junior)
tarea_investigacion = Task(
    description="Basándote en la estrategia realiza una investigación profunda del"
                "mercado de vehículos eléctricos en 2024-2025. Recopila datos sobre: "
                "tendencias de mercado, precios promedio y preferencias del consumidor",
    expected_output= "Reporte de investigación con: "
                     "1) Análisis competitivo" 
                     "2) Datos de precios",
    agent=investigador_senior,
    context=[tarea_estrategia],
    async_execution=False
)

# 3 Recopilación de datos (Investigador Junior)
tarea_recopilacion= Task(
    description="Recopila datos iniciales sobre el mercado de vehículos eléctricos en 2024 y 2025: "
                "1) Lista de los 10 principales fabricantes"
                "2) Precios promedio por segmento"
                "3) Estadísticas de ventas en 2024 y 2025"
                "Organiza la información de manera estructurada",
    expected_output="Tabla estructurada con los datos recopilados y las fuentes",
    agent=investigador_junior,
    context=[tarea_investigacion],
    async_execution=False


)

# 4 Tarea de análisis final (Director)
tarea_analisis_final = Task (
    description = "Sintetiza toda la investigación y prepara un reporte ejecutivo con recomendaciones estratégicas"
                  "1) Resumen ejecutivo"
                  "2) Oportunidades identificadas"
                  "3) Riesgos potenciales"
                  "4) Plan de implementación",
    agent=director_investigacion,
    expected_output="Reporte ejecutivo completo de entre 5 y 7 páginas con análisis de la investigación y consejos estratégicos",
    context=[tarea_investigacion, tarea_recopilacion],
    async_execution=False
)

def launch_crew():
    crew = Crew(
        agents=[
            director_investigacion,
            investigador_junior, 
            investigador_senior,
        ],
        tasks=[
            tarea_estrategia, 
            tarea_investigacion,
            tarea_recopilacion,
            tarea_analisis_final,
        ],
        process=Process.hierarchical,
        manager_llm=llm,
        memory=True,
        share_crew=True,
        )
    resultado = crew.kickoff()
    print(resultado)
