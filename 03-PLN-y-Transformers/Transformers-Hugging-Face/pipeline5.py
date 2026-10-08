from transformers import pipeline

# Predecir palabra identificada con una máscara
mi_pipeline = pipeline("fill-mask")

resultado = mi_pipeline("Using Transformers, we are in a master´s program of <mask> that will help us grow in the professional field",
                        top_k=2)

print(resultado)