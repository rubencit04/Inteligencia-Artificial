# pip install scikit-learn
# pip install nltk

import nltk
import string

nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('wordnet')

# Preprocesado datos

def preprocesar(fichero):
    r = open(fichero, "r", errors="ignore")
    contenido = f.read()
    return contenido
mi_contenido = preprocesar("turtleswiki.txt")

def tokenizar_frases(datos):
    frases_tokens = nltk.sent_tokenize(datos)
    return frases_tokens

def tokenizar_palabras(datos):
    palabras_tokens = nltk.word_tokenize(datos)
    return palabras_tokens

frases_tokens = tokenizar_frases(mi_contenido)
palabras_tokens = tokenizar_palabras(mi_contenido)

def lanzar_lemitizador():
    lemitizador = nltk.stem.WordNetLemmatizer()
    return lemitizador

mi_lemitizador = lanzar_lemitizador()

def lem_tokens(tokens):
    return {mi_lemitizador.lemmatize(token) for token in tokens}

def dar_signos_puntuacion():
    resultado = dict((ord(spunct), None)for spunct in string.punctuation)
    return resultado

mis_signos_puntuacion_a_quitar = dar_signos_puntuacion()






def ejecutar_bot():
    hay_conversacion = True
    print("Pepito Grillo: My name is Pepito. I will answer your queries. If you want to exit, type 'chaito")
    while (hay_conversacion):
        usuario_respuesta = input("USER> ")
        usuario_respuesta = get_user_response()
        usuario_respuesta = usuario_respuesta.lower()
        if (usuario_respuesta != 'chaito'):
            if (usuario_respuesta == "thanks" or usuario_respuesta == "thank you"):
                hay_conversacion = False
                print("Pepito Grillo: You are welcome")
            else:
                if(generar_saludo(usuario_respuesta)!=None):
                    print("Pepito Grillo: "+generar_saludo(usuario_respuesta))
                else:
                    print("Pepito Grillo: ",end=" ")
                    print(respuesta(usuario_respuesta))
                    frases_tokens.remove(usuario_respuesta)
        else:
            hay_conversacion = False
            print("Pepito Grillo: Bye Bye")
                    

ejecutar_bot()