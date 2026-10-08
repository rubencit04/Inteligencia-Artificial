#pip install textblob
from textblob import TextBlob

texto = """Turtles (order Testudines) are reptiles characterized 
by a special shell developed mainly from their ribs.
"""

texto = TextBlob(texto)
print(texto.correct())
#