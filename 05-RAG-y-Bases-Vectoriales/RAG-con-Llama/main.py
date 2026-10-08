import ollama
import numpy as np

# CONSTRUIMOS Y CARGAMOS EL dataset
# https://www.elephant-world.com/facts-about-elephants/
# Fichero elefantes.txt
dataset=[]
with open('elefantes.txt', 'r', encoding="utf8") as file:
    dataset = file.readlines()
    print(f'Loaded {len(dataset)} entries')

#CONSTRUIMOS LA BDD VECTORIAL
#https://ollama.com/quentinz/bge-base-zh-v1.5
EMBEDDING_MODEL = 'quentinz/bge-base-zh-v1.5:latest'

LANGUAGE_MODEL = 'llama3.2:1b'

vector_db = []

def add_chunk_to_database(chunk):
    embedding= ollama.embed(model=EMBEDDING_MODEL, input=chunk)['embeddings'][0]
    vector_db.append((chunk,embedding))

# Consideraremos cada línea se considera un chunk
for i,chunk in enumerate(dataset):
    add_chunk_to_database(chunk)
    print(f'Added chunk {i+1}/{len(dataset)} to vectorial database')

#https://en.wikipedia.org/wiki/Cosine_similarity
def cosine_similarity(vector1, vector2):
    vector1 = np.array(vector1)
    vector2 = np.array(vector2)

    dot_product = np.dot(vector1, vector2)

    norm_vector1 = np.linalg.norm(vector1)
    norm_vector2 = np.linalg.norm(vector2)

    if norm_vector1==0 or norm_vector2==0:
        raise ValueError("Cosine similarity undefined")
    
    cosine_sim=  dot_product / (norm_vector1 * norm_vector2)

    return cosine_sim

def retrieve(query, top_n=3):
    query_embedding= ollama.embed(model=EMBEDDING_MODEL, input=query)['embeddings'][0]
    ## Lista temporal. Almacenamos pares (chunk, similarity)
    similarities=[]
    for chunk, embedding in vector_db:
        similarity = cosine_similarity(query_embedding, embedding)
        similarities.append((chunk,similarity))

    #Ordenamos lista. Mayor similaridad ==> Chunks más relevante
    similarities.sort(key=lambda x: x[1], reverse=True)
    # Cogemos los n chunks más relevantes
    return similarities[:top_n]

def leerConsulta(mensaje):
    consulta_ent=input(mensaje)
    return consulta_ent

input_query = leerConsulta('Ask me a question: ')
retrieved_knowledge=retrieve(input_query)
print('Retrieved Knowledge')
for chunk, similarity in retrieved_knowledge:
    print(f' - (similarity: {similarity:.2f} {chunk})')

instruction_prompt = f''' You are a helpful chatbot.
Use only the following pieces of text to answer the question. Do not try to make up any new information:
{'\n' .join ([f' -{chunk}' for chunk, similarity in retrieved_knowledge])}
'''

# Conexión a llama y obtenemos respuesta en stream
def conectar_llama():
    conex_stream = ollama.chat(
        model=LANGUAGE_MODEL,
        messages=[
            {'role': 'system', 'content': instruction_prompt},
            {'role': 'user', 'content': input_query},
        ],
        stream=True,
    )
    return conex_stream

answer_stream = conectar_llama()

def escribir_resultado(mensaje, datosIn):
    print(mensaje)
    for chunk in datosIn:
        print(chunk['message']['content'], end='', flush=True)

escribir_resultado('Chatbot Response', answer_stream)


