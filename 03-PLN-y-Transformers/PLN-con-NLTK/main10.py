#Stemming

import nltk

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

from nltk.stem import PorterStemmer
stemmer = PorterStemmer()
stemmed_tokens = []
for token in nltk.word_tokenize(texto):
    stemmed_tokens.append(stemmer.stem(token))
print(" ".join(stemmed_tokens))

