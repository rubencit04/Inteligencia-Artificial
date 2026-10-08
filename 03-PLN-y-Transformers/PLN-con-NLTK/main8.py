# Añadir Stopwords personalizados
import spacy

# Cargamos modelo
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
although many species live in or around water.
"""
stop_words_mia = ["water","bird"]

for mi_stop_word in stop_words_mia:
    nlp.vocab[mi_stop_word].is_stop = True

docum_nlp = nlp(texto)

tokens = [token.text for token in docum_nlp if not token.is_stop == False]
print(" ".join(tokens))