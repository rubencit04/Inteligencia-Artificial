# importamos pymupdf
import fitz
# importamos streamlit
import streamlit as st

from PIL import Image

import os
from groq import Groq

client = Groq(api_key="TU_GROQ_API_KEY")
def sacar_texto_pdf (ruta):
    documento = fitz.open(ruta)
    texto=""
    #vamos añadiendo el texto de cada página
    for pagina in documento:
        texto = texto + pagina.get_text()
    return texto


def resumir_texto(texto_entrada,client, nombre_modelo):
    try:
        #client = Groq(api_key="TU_GROQ_API_KEY")
        #client = Groq(

        #   api_key=os.environ.get("GROQ_API_kEY"),

        #)
        completion = client.chat.completions.create(
        #model="llama3-70b-8192",
        model=nombre_modelo,
        messages=[
            {
                "role": "user",
                "content": f"Resúmeme este texto: {texto_entrada}"
            },
        ],
        # comentamos los parámetros
        #temperature=1,
        max_tokens=1024,
        #top_p=1,
        #stream=True,
        #stop=None,
        )
        #ssaco el contenido completo del resultado
        return completion.choices[0].message.content

    except Exception as e:
        return f"Error!!!: {e}"
    


def preguntar(fichero_tema, pregunta,client, nombre_modelo):
    try:
        #client = Groq(api_key="TU_GROQ_API_KEY")
        #client = Groq(

        #   api_key=os.environ.get("GROQ_API_kEY"),

        #)
        completion = client.chat.completions.create(
        #model="llama3-70b-8192",
        model=nombre_modelo,
        messages=[
            {
                "role": "user",
                "content": f"Context: {fichero_tema} Question: {pregunta}"
            },
        ],
        # comentamos los parámetros
        #temperature=1,
        #max_tokens=1024,
        #top_p=1,
        #stream=True,
        #stop=None,
        )
        #ssaco el contenido completo del resultado
        return completion.choices[0].message.content

    except Exception as e:
        return f"Error!!!: {e}"


# app streamlit
st.title("Trabajando con pdfs y LLama")
imagen = Image.open("imagen_intro.jpg")
st.image(imagen, use_container_width='always')

pdf_entrada = st.file_uploader("Selecciona fichero", type="pdf")

if pdf_entrada is not None:
    texto_pdf = sacar_texto_pdf(pdf_entrada)

    st.subheader("Texto tomado del PDF")
    #mostramos primeros 600 caracteres del texto
    st.write(texto_pdf[:600])

    modelo_resumen = st.selectbox(
        "Elige un modelo", 
        ["llama3-8b-8192", "llama3-70b-819", 
         "llama-3.1-8b-instant","gemma2-9b-it"],
         key="modelo_resumen"
    )

    boton_resumen = st.button("Resume texto")
    if boton_resumen:
        resumen_pdf = resumir_texto(texto_pdf, client, modelo_resumen)
        st.subheader("Resumen");
        st.write(resumen_pdf)
    


    modelo_preguntar = st.selectbox(
        "Elige un modelo", 
        ["llama3-8b-8192", "llama3-70b-819", 
         "llama-3.1-8b-instant","gemma2-9b-it"],
         key="modelo_preguntar"
    )
    pregunta = st.text_input("Realizar una preguna sobre el contenido del pdf")
    if pregunta:
        respuesta = preguntar(texto_pdf, pregunta, client, modelo_preguntar)
        st.subheader("Respuesta")
        st.write(respuesta)
