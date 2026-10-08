import os
from dotenv import load_dotenv

# Cargar variables de entorno (.env)
load_dotenv()
from src.crew import mi_crew

def run():
    print("## Iniciando el Crew en modo Jerárquico ##")
    print("------------------------------------------")
    
    # Aquí defines el input principal (el tema)
    inputs = {
        'tema': 'La invención del café y su prohibición en la historia'
    }
    
    # Creamos e iniciamos el crew
    mi_equipo = mi_crew()
    resultado = mi_equipo.kickoff(inputs=inputs)
    
    print("\n\n########################")
    print("## RESULTADO FINAL ##")
    print("########################\n")
    print(resultado)

if __name__ == "__main__":
    run()