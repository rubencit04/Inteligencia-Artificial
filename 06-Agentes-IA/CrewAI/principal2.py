from agentes4 import Publicador

def launch_crew():
    mi_publicador = Publicador()
    result = (mi_publicador
              .crew()
              .kickoff()
            )
    print(result)


if __name__ == "__main__":
    launch_crew()