from transformers import pipeline

# Clasificar texto con etiquetas nuestras
mi_pipeline = pipeline("zero-shot-classification")

resultado = mi_pipeline(
    "We are studying at Nebrija University",
    candidate_labels=["sports", "education", "movies", "business"]   
) 

print(resultado)
