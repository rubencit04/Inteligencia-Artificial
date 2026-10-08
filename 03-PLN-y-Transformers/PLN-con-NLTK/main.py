# nltk libreria básica para NLP
# Vemos la configuración mínima que vamos a utilizar
# pip install nltk

# punkt ==> Modelo preentrenado para tokenizado de texto
# Detecta ciertas situaciones complejas:
# Puntos que no son fin de frase, puntos decimales ...
import nltk
nltk.download('punkt')

# punkt_tab
# Es como punkt pero añade alguna feature

nltk.download('punkt_tab')

# Stopwords ==> Palabras comunes que habitualmente no aportan significado
# Preposiciones, congunciones etc...
# Descargamos las stopwords por defecto de nltk

nltk.download('stopwords')