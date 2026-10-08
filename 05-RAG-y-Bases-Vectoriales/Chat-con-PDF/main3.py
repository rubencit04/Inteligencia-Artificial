import fitz

import streamlit as st

from PIL import Image

from groq import Groq

client = Groq(api_key="TU_GROQ_API_KEY")
def sacar_texto_pdf (ruta):
    documento = fitz.open(ruta)
    texto=""
    for pagina in documento:
        texto = texto + pagina.get_text()
    return texto

def resumir_texto(texto_entrada, client, nombre_modelo):
    try:
        completion = client.chat.completions.create(
            model = nombre_modelo,
            messages = [
                {
                    "role": "user",
                    "content": f"Resúmeme este texto: {texto_entrada}"
                }
            ],
            max_tokens=1024,

        )
        return completion.choices[0].messages.content
    except Exception as e:
        return f"Error!!!: {e}"

def preguntar(fichero_tema, pregunta, client, nombre_modelo):
    try:
        completion = client.chat.completions.create(
            model = nombre_modelo,
            messages = [
                {
                    "role": "user",
                    "content": f"Context: {fichero_tema} Question: {pregunta}"
                }
            ],
            max_tokens=1024,

        )
        return completion.choices[0].messages.content
    except Exception as e:
        return f"Error!!!: {e}"

# Interfaz gráfica
st.title("Trabajando con pdfs y modelos")
imagen = Image.open("imagen_intro.jpg")
st.image(imagen, use_container_width='always')

pdf_entrada = st.file_uploader("Selecciona el fichero", type="pdf")

if pdf_entrada is not None:
    texto_pdf= sacar_texto_pdf(pdf_entrada)
    st.subheader("Texto tomado del pdf")
    st.write(texto_pdf[:600])

    modelo_resumen = st.selectbox(
        "Elige un modelo",
        ["llama-3.1-8b-instant", "llama-3.3-70b-versatile",
         "meta-llama/llama-guard-4-12b"],
         key="modelo_resumen"
    )

    boton_resumen = st.button("Resume texto")
    if boton_resumen:
        resumen_pdf = resumir_texto(texto_pdf, client, modelo_resumen)
        st.subheader("Resumen")
        st.write(resumen_pdf)