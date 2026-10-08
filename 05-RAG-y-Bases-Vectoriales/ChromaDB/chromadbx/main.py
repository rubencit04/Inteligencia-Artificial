# pip install chromadbx
import chromadb
from chromadbx import UUIDGenerator

cliente_chroma = chromadb.Client()

mi_coleccion=cliente_chroma.get_or_create_collection("mi_coleccion")
mis_docs=["Doc1 bla bla bla","Doc2 bla bla bla","Doc3 bla bla bla"]
mi_coleccion.add(ids=UUIDGenerator(len(mis_docs)),documents=mis_docs)

todos_docs = mi_coleccion.get()
print(todos_docs)