# MONTAR INFRAESTRUCTURA BÁSICA DE spacy
# Spacy libreria de NLP
# pip install spacy
import spacy

# Importar modelo de sapcy
# Los modelos de spacy se encuentran en la web oficial de spacy
# https://spacy.io/models
# Por ejemplo, descargaremos y cargaremos
# "en_core_web_sm"

# Descargar un modelo spacy
#En la cmd y con el entorno activado
# python -m spacy download en_core_web_sm
nlp = spacy.load("en_core_web_sm")
nlp
print("Modelo spacy cargado",nlp)