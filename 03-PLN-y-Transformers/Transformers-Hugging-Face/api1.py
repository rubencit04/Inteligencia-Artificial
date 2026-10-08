# Utilizamos la API de hugging face
# Un modelo text-to-image
import os
from huggingface_hub import InferenceClient

MODELO= "stabilityai/stable-diffusion-xl-base-1.0"
client = InferenceClient(
    provider="nscale",
    api_key="PON TU API KEY",
)

# output is a PIL.Image object
image = client.text_to_image(
    "Cat dancing electronic music",
    model= MODELO,
)

print(image)

image.show()

