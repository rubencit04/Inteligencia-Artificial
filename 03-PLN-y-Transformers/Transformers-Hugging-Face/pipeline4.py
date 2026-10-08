from transformers import pipeline

# Generación de texto indicando nosotros un modelo

mi_pipeline = pipeline("text-generation", model="Qwen/Qwen3-0.6B")

resultado = mi_pipeline (
    "The story of Alice in Wonderland is about",
    max_length=50,
    num_return_sequences=3
)

print(resultado)