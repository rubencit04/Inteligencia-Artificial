import os
from huggingface_hub import InferenceClient

MODELO= "black-forest-labs/FLUX.1-schnell"
client = InferenceClient(
    #provider="nebius",
    provider="auto",
    api_key="PON TU API KEY",
)

# output is a PIL.Image object
image = client.text_to_image(
    "Cat dancing electronic music",
    model= MODELO,
)

print(image)

image.show()

