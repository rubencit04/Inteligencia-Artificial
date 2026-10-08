import json
import mlflow
from openai import OpenAI
from pyspark.sql.functions import avg, count

TABLA_DATOS_ = "cat.datos.titanic_raw_pipeline_2026_04_29"


# ============================================
# CONFIGURACION DE MLFLOW
# ============================================
mlflow.set_tracking_uri("databricks")
mlflow.set_experiment("/Shared/demo_agente_titanic_genai")
mlflow.openai.autolog()


# ============================================
# CONFIGURACION DEL CLIENTE OPENAI PARA DATABRICKS
# ============================================
workspace_url = spark.conf.get("spark.databricks.workspaceUrl")
host = f"https://{workspace_url}"

token = (
    dbutils.notebook
    .entry_point
    .getDbutils()
    .notebook()
    .getContext()
    .apiToken()
    .get()
)

client = OpenAI(
    api_key=token,
    base_url=f"{host}/serving-endpoints",
)

MODEL_NAME = "databricks-meta-llama-3-3-70b-instruct"


@mlflow.trace(name="tool_titanic_schema")
def tool_titanic_schema():
    """Devuelve las columnas disponibles en la tabla Titanic."""
    df = spark.table(TABLA_DATOS_)
    return {"table": TABLA_DATOS_, "columns": df.columns}


@mlflow.trace(name="tool_titanic_stats")
def tool_titanic_stats():
    """Calcula estadisticas basicas de la tabla Titanic."""
    df = spark.table(TABLA_DATOS_)
    stats = (
        df.selectExpr(
            "count(*) as num_filas",
            "avg(Survived) as tasa_supervivencia",
            "avg(Age) as edad_media",
            "avg(Fare) as tarifa_media",
        )
        .toPandas()
        .iloc[0]
        .to_dict()
    )
    return stats


@mlflow.trace(name="tool_titanic_survival_by_group")
def tool_titanic_survival_by_group():
    """
    NUEVA TOOL:
    Calcula supervivencia y tamano de grupo por Sex y Pclass.
    """
    df = spark.table(TABLA_DATOS_)
    result = (
        df.groupBy("Sex", "Pclass")
        .agg(
            count("*").alias("num_pasajeros"),
            avg("Survived").alias("tasa_supervivencia"),
            avg("Fare").alias("tarifa_media"),
            avg("Age").alias("edad_media"),
        )
        .orderBy("Sex", "Pclass")
        .toPandas()
    )
    return result.to_dict(orient="records")


def llamar_llm(system_prompt, user_prompt, temperature=0.2, max_tokens=500):
    response = client.chat.completions.create(
        model=MODEL_NAME,
        temperature=temperature,
        max_tokens=max_tokens,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    )
    return response.choices[0].message.content


@mlflow.trace(name="agente_titanic_docente")
def agente_titanic_docente(pregunta):
    pregunta_lower = pregunta.lower()

    if any(
        palabra in pregunta_lower
        for palabra in ["columna", "columnas", "variable", "variables", "campos", "esquema"]
    ):
        herramienta_usada = "tool_titanic_schema"
        contexto = tool_titanic_schema()

    elif any(
        palabra in pregunta_lower
        for palabra in ["sexo", "sex", "pclass", "clase", "grupo", "comparativa"]
    ):
        herramienta_usada = "tool_titanic_survival_by_group"
        contexto = tool_titanic_survival_by_group()

    elif any(
        palabra in pregunta_lower
        for palabra in [
            "media",
            "promedio",
            "tasa",
            "supervivencia",
            "filas",
            "estadistica",
            "estadisticas",
            "fare",
            "age",
        ]
    ):
        herramienta_usada = "tool_titanic_stats"
        contexto = tool_titanic_stats()

    else:
        herramienta_usada = "ninguna"
        contexto = {"info": "No se ha usado ninguna herramienta."}

    system_prompt = """
Eres un agente docente para alumnos de Data Science.
Responde de forma clara, breve y didactica.
Si recibes datos en el contexto, usalos.
No inventes metricas ni columnas que no aparezcan en el contexto.
"""

    user_prompt = f"""
Pregunta del alumno:
{pregunta}

Herramienta usada:
{herramienta_usada}

Contexto:
{json.dumps(contexto, ensure_ascii=False, default=str)}
"""

    return llamar_llm(system_prompt=system_prompt, user_prompt=user_prompt)


preguntas = [
    "Que columnas tiene la tabla Titanic?",
    "Cual es la tasa media de supervivencia?",
    "Haz una comparativa de supervivencia por sexo y clase.",
]

for pregunta in preguntas:
    print("=" * 80)
    print("PREGUNTA:")
    print(pregunta)
    print()
    print("RESPUESTA:")
    print(agente_titanic_docente(pregunta))
    print()
