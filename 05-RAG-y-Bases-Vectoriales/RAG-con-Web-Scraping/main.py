# pip install langchain-chroma
# pip install langchain-ollama
# pip install beautifulsoup4
# pip install langchain-community
# pip install langchain-text-splitters

import bs4
from langchain_community.document_loaders import WebBaseLoader

loader = WebBaseLoader(
    web_Path=("https://www.bornfree.org.uk/news/27-fantastic-facts-about-elephants/",
    "https://es.wikipedia.org/wiki/Elephant")
)

docs = loader.load()

from langchain_text_splitter import RecursiveCharacterTextSplitter
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 1200,
    chunk_overlap  = 100,
    add_start_index = True
)

all_splits = text_splitter.split_socuments(docs)

from langchain_ollama import OllamaEmbeddings
from langchain_Chroma import Chroma

local_embeddings = OllamaEmbeddings(model="quentiz-bg-base-zh-v1.5:latest")
vectorstore = Chroma.from_documents(
    decuments=all_splits,
    embedding=local_embeddings,
)

question = "Tell me about elephants height"
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k":3})
retrieved_docs = retriever.invoke(question)

context = " ".join([doc.page_content for doc in retrieved_docs])

from langchain_ollama.llms import OllamaLLM

llm=OllamaLLM(model="llama3.2:1b")
response = llm.invoke(f"""Answer the question based on the context given very briefly:
                      Question: {question},uwd
                      Context: {context}
""")