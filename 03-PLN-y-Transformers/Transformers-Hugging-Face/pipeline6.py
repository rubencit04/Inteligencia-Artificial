from transformers import pipeline
# Reconocimento de entidades nombradas (nombres propios, nombres de compañías ..)

mi_pipeline = pipeline("ner", grouped_entities=True)
resultado = mi_pipeline("Amazon and Google are big companies. Pepito GRillo has worked at both ")
print(resultado)