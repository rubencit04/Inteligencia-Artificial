# pip install chromadb
# pip install langchain-text-splitters
# pip install langchain-ollama
# pip install langchain-community
# pip install langchain-classic

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_classic.chains import RetrievalQA
from langchain_ollama import OllamaLLM, OllamaEmbeddings

# 1 Cargar el documentos
cargador = TextLoader("elefantes.txt", encoding="utf-8")
documents = cargador.load()

# 2  Partir en chunks
texto_partido = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
    )
chunks = texto_partido.split_documents(documents)

# 3 Creamos embeddings y base de datos vectorial
embeddings = OllamaEmbeddings(model="quentinz/bge-base-zh-v1.5:latest")
llm = OllamaLLM(model="llama3.2:1b")

vectorstore = Chroma.from_documents(
    documents= chunks,
    embedding=embeddings
)

# 4 Creamos la cadena QA
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever()
)

# 5 Preguntar algo
respuesta = qa_chain.invoke({"query": "tell me about elephant weight"})
print(respuesta["result"])

print("$$$$$$$$$$$$$$$$$$$$$$$$$$$FIN$$$$$$$$$$$$$$$$$$$$$$$$$$")
