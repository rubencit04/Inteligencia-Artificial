# Con configuración de agentes y tareas con .yml
from crewai import Agent, Task, Crew, Process, LLM
import os
from crewai.project import CrewBase, agent, crew, task

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

# Lógica de Agentes
@CrewBase
class Publicador():
    agents_config = "config/agents.yaml"
    tasks_config = "config/tasks.yaml"

    
# 2 Definir Agentes
    @agent
    def researcher(self) -> Agent:
        return Agent (
            config = self.agents_config['researcher'],
            allow_delegation=False,
            verbose=True,
            llm=llm
        )
    
    @agent
    def writer (self) -> Agent:
        return Agent(
            config=self.agents_config['writer'],
            allow_delegation=False,
            verbose=True,
            llm=llm
        )

# 3 definir tareas
    @task
    def research (self) -> Task:
        return Task(
            config=self.tasks_config['research']
        )

    @task
    def write (self) -> Task: 
        return Task(
            config=self.tasks_config['write']
        )
    
    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=[self.researcher(), self.writer()],
            tasks=[self.research(), self.write()],
            verbose=True
        )
  