from transformers import pipeline

# Responder preguntas
mi_pipeline = pipeline("question-answering")
resultado = mi_pipeline(
    question="Where do I live",
    context="I live in Aluche"
)

print(resultado)