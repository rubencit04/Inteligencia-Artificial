# pip install chromadb
import chromadb
# Crear el cliente
#cliente_chroma = chromadb.Client()
cliente_chroma = chromadb.PersistentClient(path="./bddchroma")


# Crear coleccion
mi_colecc = cliente_chroma.create_collection("mi_coleccion")

# Añadir coleccion
mi_colecc.add(
    ids=["ident1", "ident2", "ident3"],
    documents=[
        "El elefante africano tiene dos metros de altura.",
        "El tigre africano como carne.",
        "El elefante de media es más alto que la mayoria"]  
)

resultados1 = mi_colecc.query(
    query_texts=["Consulta sobre africa"],
    n_results=2
)

print(resultados1)

mi_colecc.add(
    ids=["ident4", "ident5"],
    documents=[
        "El lince tiene el sentido del oido muy desarrollado.",
        "En la península ibérica como el lince y el lobo",]  
)

resultados2 = mi_colecc.querry(
    query_texts=["Cuentame donde vive el lince"],
    n_results=2
)

print(resultados2)

# Podemos añadir metadatos
mi_colecc.add(
    ids=["ident6","ident7"],
    documents=[
        "El elefante adulto puede pesar 20 veces el peso de un tigre",
        "bla bla bla bla bla bla bla bla"
    ],
    metadatas=[
        {"web":"miselefantes.com"},
        {"tomo":1,"capitulo":3}
    ]
)


# Actulaizar
mi_colecc.update(
    ids=["ident6","ident7"],
    documents=[
               "El ornitorrinco es un bicho raro",
               "El ornitorrinco no vive en la peninsula iberica"
    ],
    metadatas=[
        {"fuente":"National Geographic"},
        {"tomo":2,"capitulo":5}
    
    ]
)

resultados3 = mi_colecc.query(
    query_texts=["Cuentame sobre el ornotorrinco"],
    n_results=2
)

print(resultados3)

# Eliminar un elemento

mi_colecc.delete(ids=["ident1""ident3"])

resultados4 = mi_colecc.query(
    query_texts=["Cuentame sobre los elefantes"],
    n_results=2
)

print(resultados4)

# Sacar todos los documentos de una coleccion
todos_documentos = mi_colecc.get()
print(todos_documentos)

# Consulta con filtrado

resultados5 = mi_colecc.query(
    query_texts=["Cuentame sobre el ornotorrinco"],
    n_results=2,
    where={"fuente":"National Geographic"}
)

print(resultados5)