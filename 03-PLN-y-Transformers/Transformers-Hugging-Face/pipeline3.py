from transformers import pipeline
# Generación de texto

mi_pipeline = pipeline("text-generation")
resultado = mi_pipeline("The steps for cooking roast chicken are")

print(resultado)