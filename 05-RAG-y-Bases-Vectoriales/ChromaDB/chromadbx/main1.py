import chromadb

client = chromadb.CloudClient(
  api_key='TU_CHROMA_API_KEY',
  tenant='e805f361-c7b2-45a8-999c-2c5068bc13bf',
  database='prueba1'
)

mi_coleccion=client.get_or_create_collection("mi_coleccion")
mi_coleccion2=client.get_or_create_collection("mi_coleccion")
mi_coleccion.add(
    ids=["ident1","ident2","ident3"],
    documents=[
    "El elefante tiene las orejas mas grandes",
    "El tigre africano come cebras",
    "El elefante de media pesa mas que la mayoria de los animales"
    ]
)

mi_coleccion2.add(
    ids=["ident4","ident5","ident6"],
    documents=[
    "Los elefantes viven en africa",
    "El tigre corre mucho",
    "El elefante de media tiene mas memoria que la mayoria de animales"
    ]
)

resultados = mi_coleccion.query(
    query_texts=["Cuentame sobre los elefantes"],
    n_results=2
)

#print(resultados)

colecciones=client.list_collections()
for coleccion in colecciones:
    resultado_actual=coleccion.query(
        query_texts=["Cuentame sobre los elefantes"],
        n_results=2
    )
    print(resultado_actual)

