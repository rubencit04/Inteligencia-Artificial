import ollama  

# traigo el modelo de Ollama
from langchain_ollama import OllamaLLM
# para el mensaje de humano y de la IA
from langchain_core.messages import HumanMessage, AIMessage

# para lchat personalizado y que considere historial
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

llm = OllamaLLM(model="llama3.2:1b", temperature=0.1)

chat_history = []

prompt_template = ChatPromptTemplate.from_messages(
    [ 
        (
            "system",
            "Eres un sistema de IA llamado Grillo que responde preguntas y ademas tiene memoria y devuelve preguntas adaptadas al contexto"

        ),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),

    ]
)

# una chain de langchain con la template y el modelo

chain = prompt_template | llm

def chatear():
    esFinal = False
    while not esFinal:
        pregunta = input("Tú: ")
        esFinal = pregunta == "sayonara"
        if not esFinal:
            response = chain.invoke({"input": pregunta, "chat_history": chat_history})
            chat_history.append(HumanMessage(content=pregunta))
            chat_history.append(AIMessage(content=response))
        print("--------------------------------------------")
        print("Grillo: " + response)
        

chatear()
