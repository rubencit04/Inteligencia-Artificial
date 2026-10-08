import ollama

# Para ver respuesta en stream
# Se mostrarán los datos a medid que el modelo lo va entregando


mensajes = [
    {
        'role': 'user',
        'content': "Escribe una carta de recomendación para una universidad de aproximadamente 100 líneas"
    }
    ]

stream = ollama.chat(model='llama3.2:1b', messages=mensajes, stream=True)

for parte in stream:
    # end='' Después de cada parte no me pone nada. Evita que haya salto de línea
    # flush='true' Contenido aparece directamente en pantalla sin esperar que se me llene el buffer
    print(parte['message']['content'], end='', flush=True )
    