# Recordad que hay que hacer:
# pip install transformers
# Análisis de sentimiento
from transformers import pipeline

mi_pipeline = pipeline("sentiment-analysis")
resultado = mi_pipeline("Being a programmer is my life´s dream")

print(resultado)

resultado2 = mi_pipeline(
    ["Being a programmer is my life´s dream", "Programming is boring and I hate it"]
)

print(resultado2)
