import ollama

mensajes=[
    {
        'role': 'user',
        'content':'desarrolla una idea para trabajo fin de grado de informática',
    },]

response = ollama.chat(model='llama3.2:1b', messages=mensajes)

print (response['message']['content'])

