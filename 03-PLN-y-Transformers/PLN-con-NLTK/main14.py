# Similaridad

import spacy

nlp = spacy.load("en_core_web_sm")

word1 = "turtle"
word2 = "title"
word3 = "little"
word4 = "apple"

token1 = nlp(word1)
token2 = nlp(word2)
token3 = nlp(word3)
token4 = nlp(word4)

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
texto2 = """Penguins are a group of flightless, semi-aquatic, sea birds which live almost exclusively in the Southern Hemisphere. Only one species, the Galápagos penguin, lives at, and slightly north of, the equator. Highly adapted for life in the ocean water, penguins have countershaded dark and white plumage and flippers for swimming. Most penguins feed on krill, fish, squid and other forms of sea life which they catch with their bills and swallow whole while swimming. A penguin has a spiny tongue and powerful jaws to grip slippery prey.[4]"""

print("Similaridad entre ", word1, "y ",word2, "es: ",token1.similarity(token2))
print("Similaridad entre ", word1, "y ",word3, "es: ",token1.similarity(token3))
print("Similaridad entre ", word2, "y ",word3, "es: ",token1.similarity(token2))

docum1 = nlp(texto)
docum2 = nlp(texto2)
print("Similaridad entre ", texto, "y ",texto2, "es: ",docum1.similarity(docum2))

