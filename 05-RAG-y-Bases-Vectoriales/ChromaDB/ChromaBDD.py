import chromadb
from chromadbx import UUIDGenerator
import uuid
from datetime import datetime
 
# CLIENTE EN NUBE
client = chromadb.CloudClient(
    api_key='TU_CHROMA_API_KEY',
    tenant='e805f361-c7b2-45a8-999c-2c5068bc13bf',
    database='Ejercicio1'
)

# CLIENTE PERSISTENTE
# cliente_chroma = chromadb.PersistentClient(path="./bddchroma")

# COLECCIONES
mi_coleccion = client.get_or_create_collection("mi_coleccion")
mi_coleccion2 = client.get_or_create_collection("mi_coleccion2")
mi_coleccion3 = client.get_or_create_collection("mi_coleccion3")
mi_coleccioncrud = client.get_or_create_collection("mi_coleccioncrud")

# DOCUMENTOS
docs1 = [
    "The Legend of Zelda: Breath of the Wild es un juego de aventura para Nintendo Switch.",
    "Elden Ring es un juego de rol de acción disponible en PC, PS5 y Xbox.",
    "Minecraft es un juego sandbox disponible en múltiples plataformas."
]

docs2 = [
    "Nintendo EPD es un estudio japonés famoso por Zelda, Mario y Splatoon.",
    "FromSoftware es un estudio japonés conocido por Elden Ring, Dark Souls y Bloodborne.",
    "Mojang Studios es un estudio sueco famoso por Minecraft."
]

docs3 = [
    "Final Fantasy VII es un juego de rol clásico para PlayStation.",
    "The Witcher 3: Wild Hunt es un RPG de acción épico para PC y consolas.",
    "Overwatch es un shooter multijugador por equipos desarrollado por Blizzard."
]

docs4 = [
    "God of War Ragnarok es un juego de acción y aventura para PS5.",
    "Horizon Forbidden West es un juego de mundo abierto para PS5.",
    "Cyberpunk 2077 es un RPG futurista para PC y consolas."
]

# IDS

# Colección 2: IDs fijos
ids2 = ["ident1", "ident2", "ident3"]

# Colección 3: UUID aleatorio
ids3 = [str(uuid.uuid4()) for _ in docs2]

# Colección CRUD: IDs con timestamp
ids_crud = [datetime.now().strftime("%Y%m%d%H%M%S%f") + f"_{i}" for i in range(len(docs3))]

# Añadir colecciones 
mi_coleccion.add(
    ids=list(UUIDGenerator(len(docs1))), 
    documents=docs1
)

mi_coleccion2.add(
    ids=ids2,
    documents=[
        "Breath of the Wild tiene una valoración de 10, es una obra maestra del mundo abierto.",
        "Elden Ring tiene un rating de 9.5, combate magnífico y exploración espectacular.",
        "Minecraft tiene un rating de 9, creatividad ilimitada y diversión sin fin."
    ],
    metadatas=[
        {"game":"Breath of the Wild","rating":10},
        {"game":"Elden Ring","rating":9.5},
        {"game":"Minecraft","rating":9}
    ]
)

mi_coleccion3.add(
    ids=ids3,
    documents=docs2,
    metadatas=[
        {"studio":"Nintendo EPD","location":"Japón"},
        {"studio":"FromSoftware","location":"Japón"},
        {"studio":"Mojang Studios","location":"Suecia"}
    ]
)

mi_coleccioncrud.add(
    ids=ids_crud,
    documents=docs3,
    metadatas=[
        {"genre":"RPG","platform":"PlayStation"},
        {"genre":"RPG","platform":"PC / Consoles"},
        {"genre":"Shooter","platform":"PC / Consoles"}
    ]
)

# ACTUALIZAR DOCUMENTOS
ids_actuales_crud = mi_coleccioncrud.get()["ids"] 

mi_coleccioncrud.update(
    ids=ids_crud,      
    documents=docs4,
    metadatas=[
        {"genre":"Action/Adventure","platform":"PS5"},
        {"genre":"Open World","platform":"PS5"},
        {"genre":"RPG","platform":"PC/Consoles"}
    ]
)

# LEER DOCUMENTOS
todos_documentos = mi_coleccioncrud.get()
print("Todos los documentos de mi_coleccioncrud:", todos_documentos)

# ELIMINAR DOCUMENTOS
mi_coleccioncrud.delete(ids=ids_actuales_crud[1:3])

#  AND
resultados_and = mi_coleccion3.query(
    query_texts=["Busco el juego que sea de FromSoftware y esté en Japón"],
    n_results=10,
    where={
        "$and": [
            {"studio": "FromSoftware"},
            {"location": "Japón"}
        ]
    }
)
print("Consulta AND:", resultados_and)

# OR 
resultados_or = mi_coleccioncrud.query(
    query_texts=["Busco juegos de PS5 o RPGs"],
    n_results=10,
    where={
        "$or": [
            {"platform": "PS5"},
            {"genre": "RPG"}
        ]
    }
)
print(resultados_or)

# ACUMULACIÓN 
todos_reviews = mi_coleccion2.get()
promedio_rating = sum([m["rating"] for m in todos_reviews["metadatas"]]) / len(todos_reviews["metadatas"])
print("Promedio de rating de juegos:", promedio_rating)
