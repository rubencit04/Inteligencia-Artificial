#Eliminar signod de puntuacion
#Usaremos spacy

import spacy

nlp = spacy.load("en_core_web_sm")
texto = """Turtles (order Testudines) are reptiles characterized by a special shell developed mainly from their ribs.
Modern turtles are divided into two major groups, 
the Pleurodira (side necked turtles) and Cryptodira (hidden necked turtles), 
which differ in the way the head retracts. 
There are 360 living and recently extinct species of turtles, 
including land-dwelling tortoises and freshwater terrapins. 
They are found on most continents, 
some islands and, in the case of sea turtles, much of the ocean. 
Like other amniotes (reptiles, birds, and mammals) they breathe air and do not lay eggs underwater, 
although many species live in or around water."
"""

doc_nlp = nlp(texto)
new_token = []
for token in doc_nlp:
    if token.is_punct == False:
        new_token.append(token.text)
print(" ".join(new_token))