"""
=============================================================================
 DEMO: LANGFUSE v4 + GROQ  -  Observabilidad en aplicaciones LLM
=============================================================================
 Proyecto Fin de Curso - Langfuse (Observabilidad)
 Fecha: Mayo 2026

 Este script demuestra las principales capacidades de Langfuse v4:
   1. Trazabilidad automatica de llamadas LLM (tracing)
   2. Uso del decorador @observe() para crear spans anidados
   3. Metadata personalizada (usuario, sesion, etiquetas, scores)
   4. Pipeline RAG multi-paso observado de extremo a extremo
   5. Puntuacion (scoring) de respuestas
   6. Conversacion multi-turno agrupada por sesion

 Requisitos:
   pip install langfuse openai groq python-dotenv

 Variables de entorno (.env):
   LANGFUSE_PUBLIC_KEY=pk-lf-...
   LANGFUSE_SECRET_KEY=sk-lf-...
   LANGFUSE_BASE_URL=https://cloud.langfuse.com
   GROQ_API_KEY=gsk_...
=============================================================================
"""

import os
import time
import random
from dotenv import load_dotenv

# -- 1. Cargar variables de entorno -------------------------------------------
load_dotenv(override=True)

# -- 2. Importar Langfuse v4 ---------------------------------------------------
#    @observe   -> importar desde langfuse directamente (ya NO langfuse.decorators)
#    get_client -> cliente singleton con acceso al contexto de traza activo
from langfuse import observe, get_client
from langfuse.openai import OpenAI   # Drop-in: wrapper automatico sobre OpenAI SDK

# -- 3. Inicializar cliente Langfuse -------------------------------------------
langfuse = get_client()

# -- 4. Inicializar cliente Groq via wrapper de Langfuse ----------------------
#    Groq es 100% compatible con la API de OpenAI -> solo cambiamos la base_url
client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.environ.get("GROQ_API_KEY"),
)

MODELO = "llama-3.3-70b-versatile"   # Modelo ultrarapido de Groq (gratuito)


# =============================================================================
# DEMO 1 - Llamada simple: tracing automatico sin decorador
# =============================================================================
def demo_llamada_simple():
    """
    La forma mas sencilla de observar con Langfuse.
    Solo cambiando el import (langfuse.openai en lugar de openai),
    Langfuse captura AUTOMATICAMENTE:
      - Prompt enviado al modelo
      - Respuesta completa recibida
      - Tokens usados (input / output / total)
      - Latencia de la llamada
      - Modelo y parametros usados
    """
    print("\n" + "="*60)
    print("DEMO 1 - Llamada simple con tracing automatico")
    print("="*60)

    with langfuse.start_as_current_observation(
        as_type="span",
        name="demo-llamada-simple",
        metadata={"demo": "1", "descripcion": "llamada simple sin decorador"},
    ):
        respuesta = client.chat.completions.create(
            model=MODELO,
            messages=[
                {"role": "system", "content": "Eres un asistente experto en IA y MLOps."},
                {"role": "user",   "content": "Que es Langfuse y para que sirve? Resume en 3 puntos clave."},
            ],
            temperature=0.5,
        )

    texto = respuesta.choices[0].message.content
    print(f"\nRespuesta del modelo:\n{texto}\n")
    print(f"Tokens -> Input: {respuesta.usage.prompt_tokens} | "
          f"Output: {respuesta.usage.completion_tokens} | "
          f"Total: {respuesta.usage.total_tokens}")
    return texto


# =============================================================================
# DEMO 2 - Pipeline RAG con @observe(): spans anidados automaticos
# =============================================================================

@observe(name="retrieval", as_type="retriever")
def recuperar_contexto(pregunta: str) -> str:
    """
    Fase RETRIEVAL del pipeline RAG.
    El decorador @observe crea un span hijo 'retrieval' en Langfuse.
    En produccion aqui iria la busqueda vectorial (FAISS, Chroma, Pinecone...).
    """
    time.sleep(0.3)  # Simular latencia de busqueda vectorial

    langfuse.update_current_span(
        metadata={
            "vectorstore": "FAISS (simulado)",
            "top_k": 3,
            "similarity_threshold": 0.75,
            "embedding_model": "text-embedding-3-small",
        }
    )

    # Fragmentos de contexto simulados (en RAG real -> vectorstore)
    fragmentos = [
        "Langfuse es una plataforma open-source de observabilidad para LLMs.",
        "Permite monitorizar trazas, latencias, costes y calidad de respuestas en tiempo real.",
        "Se integra con OpenAI, Anthropic, Groq, LangChain, LlamaIndex y mas herramientas.",
    ]
    return "\n".join(f"[{i+1}] {f}" for i, f in enumerate(fragmentos))


@observe(name="generation", as_type="generation")
def generar_respuesta_rag(pregunta: str, contexto: str) -> str:
    """
    Fase GENERATION del pipeline RAG.
    Span hijo 'generation' anidado dentro del span raiz del pipeline.
    """
    langfuse.update_current_span(
        metadata={"modelo": MODELO, "estrategia": "RAG", "temperatura": 0.3}
    )

    prompt_sistema = (
        "Eres un asistente experto. Usa SOLO el siguiente contexto para responder. "
        "Si la respuesta no esta en el contexto, indicalo claramente.\n\n"
        f"CONTEXTO RECUPERADO:\n{contexto}"
    )

    respuesta = client.chat.completions.create(
        model=MODELO,
        messages=[
            {"role": "system", "content": prompt_sistema},
            {"role": "user",   "content": pregunta},
        ],
        temperature=0.3,
    )
    return respuesta.choices[0].message.content


@observe(name="pipeline-rag")
def pipeline_rag(pregunta: str, usuario_id: str = "user-demo") -> dict:
    """
    Pipeline RAG completo observado de extremo a extremo.

    Langfuse registra la jerarquia completa de spans:
      pipeline-rag        (span raiz)
        recuperar_contexto  (span hijo - busqueda vectorial)
        generar_respuesta   (span hijo - llamada al LLM)
               [LLM call a Groq - registrada automaticamente]
    """
    langfuse.update_current_span(
        metadata={
            "usuario": usuario_id,
            "version_pipeline": "1.0",
            "entorno": "demo-proyecto-fin-de-curso",
        }
    )

    trace_id = langfuse.get_current_trace_id()

    print(f"\n[RAG] Recuperando contexto para: '{pregunta}'")
    contexto = recuperar_contexto(pregunta)

    print("[RAG] Generando respuesta con contexto recuperado...")
    respuesta = generar_respuesta_rag(pregunta, contexto)

    return {"respuesta": respuesta, "trace_id": trace_id, "contexto": contexto}


# =============================================================================
# DEMO 3 - Scoring: evaluar calidad de respuestas programaticamente
# =============================================================================
def puntuar_respuesta(trace_id: str):
    """
    Anade scores a una traza en Langfuse.
    Los scores permiten evaluar la calidad de las respuestas de forma:
      - Programatica (con metricas automaticas como RAGAS, DeepEval)
      - Manual (feedback humano desde la UI de Langfuse)

    Metricas tipicas en RAG:
      - faithfulness:  La respuesta se basa en el contexto?
      - relevance:     Es relevante para la pregunta?
      - helpfulness:   Resulta util para el usuario?
    """
    metricas = {
        "faithfulness": round(random.uniform(0.75, 1.0), 2),
        "relevance":    round(random.uniform(0.70, 1.0), 2),
        "helpfulness":  round(random.uniform(0.80, 1.0), 2),
    }

    for nombre, valor in metricas.items():
        langfuse.create_score(
            trace_id=trace_id,
            name=nombre,
            value=valor,
            comment=f"Evaluacion automatica de demo - {nombre}",
        )

    print(f"\nScores registrados en Langfuse (trace_id: {trace_id[:16]}...):")
    for nombre, valor in metricas.items():
        barra = "#" * int(valor * 10) + "-" * (10 - int(valor * 10))
        print(f"  {nombre:<15} [{barra}]  {valor:.2f}")


# =============================================================================
# DEMO 4 - Conversacion multi-turno agrupada por sesion
# =============================================================================
@observe(name="chat-turno")
def turno_conversacion(mensajes: list) -> str:
    """
    Un turno de conversacion observado.
    Langfuse agrupa multiples turnos bajo la misma sesion,
    permitiendo analizar conversaciones completas en la UI.
    """
    langfuse.update_current_span(
        metadata={"num_mensajes_historial": len(mensajes)}
    )

    respuesta = client.chat.completions.create(
        model=MODELO,
        messages=mensajes,
        temperature=0.6,
    )
    return respuesta.choices[0].message.content


def demo_conversacion_multituno():
    """
    Simula una conversacion de 3 turnos agrupada bajo una sesion unica.
    En Langfuse podras ver todos los turnos agrupados en la vista de Sesiones.
    """
    print("\n" + "="*60)
    print("DEMO 3 - Conversacion multi-turno con sesion agrupada")
    print("="*60)

    session_id = f"sesion-demo-{int(time.time())}"
    print(f"Session ID: {session_id}")

    historial = [
        {"role": "system", "content": "Eres un asistente experto en herramientas MLOps y observabilidad de LLMs."},
    ]

    preguntas = [
        "Cual es la diferencia entre Langfuse y LangSmith?",
        "Langfuse es completamente open-source?",
        "Puedo usarlo con modelos locales como Ollama?",
    ]

    for i, pregunta in enumerate(preguntas, 1):
        print(f"\nTurno {i}: {pregunta}")
        historial.append({"role": "user", "content": pregunta})

        with langfuse.start_as_current_observation(
            as_type="span",
            name=f"sesion-{session_id}",
            metadata={"session_id": session_id, "turno": i, "usuario": "alumno-demo"},
        ):
            respuesta = turno_conversacion(historial)

        historial.append({"role": "assistant", "content": respuesta})
        preview = respuesta[:200] + ("..." if len(respuesta) > 200 else "")
        print(f"Respuesta: {preview}")
        time.sleep(0.3)


# =============================================================================
# MAIN - Ejecutar todas las demos
# =============================================================================
def main():
    separador = "=" * 60
    print(f"\n{separador}")
    print("  DEMO: LANGFUSE v4 + GROQ")
    print("  Observabilidad en aplicaciones LLM")
    print("  Proyecto Fin de Curso")
    print(f"{separador}")

    # Verificar configuracion
    missing = []
    for var in ["LANGFUSE_PUBLIC_KEY", "LANGFUSE_SECRET_KEY", "GROQ_API_KEY"]:
        if not os.environ.get(var):
            missing.append(var)
    if missing:
        print(f"\n[ERROR] Variables de entorno faltantes: {', '.join(missing)}")
        print("  Rellena el fichero .env y vuelve a ejecutar el script.\n")
        return

    print("\nConfiguracion OK. Iniciando demos...")

    # ── DEMO 1: Llamada simple ──────────────────────────────────────────────
    demo_llamada_simple()
    input("\n[ENTER para continuar con DEMO 2 - Pipeline RAG...]")

    # ── DEMO 2: Pipeline RAG ────────────────────────────────────────────────
    print(f"\n{separador}")
    print("DEMO 2 - Pipeline RAG con spans anidados (@observe)")
    print(f"{separador}")
    print("Jerarquia de spans que veras en Langfuse:")
    print("  pipeline-rag")
    print("    +-- retrieval   (busqueda vectorial)")
    print("    +-- generation  (llamada LLM)")
    print("           +-- [LLM call Groq - automatico]")

    resultado = pipeline_rag(
        pregunta="Que metricas permite monitorizar Langfuse en un sistema RAG?",
        usuario_id="alumno-demo",
    )
    print(f"\nRespuesta RAG:\n{resultado['respuesta']}\n")

    # ── DEMO 3: Scoring ─────────────────────────────────────────────────────
    if resultado.get("trace_id"):
        print(f"\n{separador}")
        print("DEMO 2b - Scoring: puntuando la calidad de la respuesta")
        print(f"{separador}")
        puntuar_respuesta(resultado["trace_id"])

    input("\n[ENTER para continuar con DEMO 3 - Multi-turno...]")

    # ── DEMO 4: Conversacion multi-turno ────────────────────────────────────
    demo_conversacion_multituno()

    # ── Flush: garantiza que todos los eventos se envien ────────────────────
    print("\nEnviando eventos pendientes a Langfuse...")
    langfuse.flush()

    # ── Resumen final ────────────────────────────────────────────────────────
    print(f"\n{separador}")
    print("  DEMO COMPLETADA CON EXITO")
    print(f"  Dashboard: https://cloud.langfuse.com")
    print(f"{separador}")
    print("\nQue encontraras en el dashboard de Langfuse:")
    print("  - Trazas de cada llamada con latencia y tokens")
    print("  - Spans anidados del pipeline RAG (retrieval -> generation -> LLM)")
    print("  - Sesiones agrupadas de la conversacion multi-turno")
    print("  - Scores de calidad (faithfulness, relevance, helpfulness)")
    print("  - Metadata: modelos, versiones, entornos\n")


if __name__ == "__main__":
    main()
