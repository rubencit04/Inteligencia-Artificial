# tokenizar usando stopwords delimitadoras
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
# delimitadores considerados
stop_words_and_delims = [".",",","?","-","!""the","is"]

# Busco las palabras de la colección y las cambio
# por un patrón común

for palab in stop_words_and_delims:
    texto = texto.replace(palab,"DELIM")

words = [t.strip() for t in texto.split("DELIM")]
words_filtered = list(filter (lambda a: a not in [""],words))
print(words_filtered)