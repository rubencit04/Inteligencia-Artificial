from crewai.tools import BaseTool

class ContadorPalabrasTool(BaseTool):
    name: str = "Contador de Palabras"
    description: str = (
        "Útil para contar las palabras de un texto. "
        "Usa esto cuando necesites verificar si un borrador cumple con la longitud requerida."
    )

    def _run(self, texto: str) -> str:
        # Lógica simple de Python
        cantidad = len(texto.split())
        return f"El texto tiene {cantidad} palabras."

class AnalisisSentimientoTool(BaseTool):
    name: str = "Analisis de Sentimiento"
    description: str = (
        "Analiza si un texto tiene un tono inspirador y positivo. "
        "Úsalo para verificar el cierre del guion."
    )

    def _run(self, texto: str) -> str:
        # Buscamos palabras clave que denoten inspiración o positividad
        palabras_positivas = ['futuro', 'esperanza', 'increíble', 'descubrir', 'gracias', 'inspirar', 'sueño', 'historia']
        texto_lower = texto.lower()
        score = sum(1 for p in palabras_positivas if p in texto_lower)
        
        if score >= 2:
            return "El texto tiene un tono INSPIRADOR y positivo adecuado."
        else:
            return "El texto es demasiado neutro. Intenta añadir palabras más emotivas o inspiradoras."