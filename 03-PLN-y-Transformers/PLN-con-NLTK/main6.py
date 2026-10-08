# ELIMINAR LAS STOPWORDS CON nltk
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords

my_stopwords = set(stopwords.words("english"))
new_tokens = []
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
# Tokenizamos
all_tokens = nltk.word_tokenize(texto)
for token in all_tokens:
    if token not in my_stopwords:
        new_tokens.append(token)
print(" ".join(new_tokens))