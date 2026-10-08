from langchain_ollama import OllamaLLM
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import streamlit as st

llm = OllamaLLM(model="llama3.2:1b", temperature=0.1)

def main():
    st.title("Hola, este es un chatbot con memoria")

    #Configuracion del bot
    bot_name = st.text_input("Nombre del bot:", value="Eusebio")
    prompt = f"""Eres in asistente virtual, te llamas {bot_name}. Respondes preguntas y tienes memoria de la conversacion previa."""

    # Descripcion del bot
    bot_description = st.text_area("Descripcion del Asitente Virtual:", value=prompt)

    # Historial de chat en la sesion
    if "chat_history" not in st.session_state:
            st.session_state["chat_history"] = []

    #Plantilla de prompt
    prompt_template = ChatPromptTemplate.from_messages(
        [
            ("system", bot_description ),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
        ]
    )

    chain = prompt_template | llm

    # Input para decirle al usuario que escriba su pregunta
    user_input = st.text_input("Escribe tu pregunta: ", key="user_input")
    
    #Boton para preguntar
    if(st.button("Preguntar")):
        if user_input.lower() == "taluego":
             st.stop()
        else:
             response=chain.invoke({"input": user_input, "chat_history": st.session_state["chat_history"]})
             st.session_state["chat_history"].append(HumanMessage(content=user_input))
             st.session_state["chat_history"].append(AIMessage(content=response.content))

    chat_display=""
    for msg in st.session_state["chat_history"]:
         if isinstance(msg, HumanMessage):
              chat_display += f" Humano: {msg.content}\n"
         elif isinstance(msg, AIMessage):
              chat_display += f" {bot_name}: {msg.content}\n"

    st.text_area("Chat", value=chat_display, height=400, key="chat_area")



    

    
if __name__ == "__main__":
     main()