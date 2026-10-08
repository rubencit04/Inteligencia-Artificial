import ollama

def chat_with_ollama():
    print ("Hola estás en un chatBot de LLama 3.2 2 1b Pon 'taluego' para acabar")
    fin = False
    entrada_usuario=""
    while entrada_usuario!="taluego":
        entrada_usuario = input("Usuario: ")
        if entrada_usuario == "taluego":
            print("Hasta pronto!!")
            fin=True
        else:
            response = ollama.generate(model='llama3.2:1b', prompt=entrada_usuario)
            print("Bot simpaticón:", response['response'])

chat_with_ollama()
