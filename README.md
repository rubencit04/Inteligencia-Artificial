# 🤖 Inteligencia Artificial: de las redes neuronales a los agentes

Este repositorio reúne los proyectos de Inteligencia Artificial que he desarrollado durante el **Máster en Inteligencia Artificial y Big Data (Nebrija)**: deep learning, procesamiento del lenguaje, LLMs, RAG, agentes, servidores MCP, automatización con n8n y desarrollo de software asistido por IA.

> Los proyectos de ingeniería de datos, ciencia de datos y Business Intelligence están en el repositorio [BigData](https://github.com/rubencit04/BigData).

## 🗺️ Mapa del repositorio

| Carpeta | Qué contiene |
| --- | --- |
| 🧠 [01-Deep-Learning](./01-Deep-Learning) | Redes neuronales, CNN, transfer learning, RNN, LSTM y transferencia de estilo |
| 🎲 [02-Aprendizaje-por-Refuerzo](./02-Aprendizaje-por-Refuerzo) | Q-Learning y método de Montecarlo |
| 💬 [03-PLN-y-Transformers](./03-PLN-y-Transformers) | NLTK, spaCy, TextBlob y pipelines de Hugging Face |
| 🗨️ [04-LLMs-y-Chatbots](./04-LLMs-y-Chatbots) | Chatbots con Groq y Ollama, function calling, Batch API y observabilidad |
| 📚 [05-RAG-y-Bases-Vectoriales](./05-RAG-y-Bases-Vectoriales) | RAG con LangChain, ChromaDB, chat con PDF y web scraping |
| 🕵️ [06-Agentes-IA](./06-Agentes-IA) | Agentes con CrewAI y un agente en Databricks |
| 🔌 [07-MCP](./07-MCP) | Servidores MCP en Python y Node.js |
| ⚡ [08-Automatizacion-n8n](./08-Automatizacion-n8n) | Flujos de n8n autoalojado con Docker |
| 🛠️ [09-Desarrollo-con-IA](./09-Desarrollo-con-IA) | Clean Code, SOLID, OpenCode y skills para agentes |
| 🖥️ [10-Interfaces-con-Gradio](./10-Interfaces-con-Gradio) | Interfaces para modelos con Gradio y Streamlit |
| 🧩 [11-Sistemas-Expertos](./11-Sistemas-Expertos) | Memoria sobre sistemas expertos |

---

## 🧠 1. Deep Learning

- **Redes neuronales:** clasificación con redes densas y un estudio de hiperparámetros (profundidad, epochs, learning rate, batch size, Adam frente a SGD) con el *Dry Bean Dataset*.
- **CNN y transfer learning:** redes convolucionales para clasificar imágenes y reutilización de modelos preentrenados.
- **Redes recurrentes:** predicción de la calidad del aire con RNN (*Air Quality UCI*).
- **LSTM frente a CNN:** comparativa de las dos arquitecturas sobre el mismo problema, con su memoria.
- **Transferencia de estilo neuronal:** aplicar el estilo de una obra de arte a una foto con TensorFlow Hub.
- **Aumentación de datos** y un **perceptrón programado desde cero**.

## 🎲 2. Aprendizaje por refuerzo

- **Q-Learning:** un agente que aprende a resolver *FrozenLake* con Gymnasium.
- **Método de Montecarlo:** simulación y estimación por muestreo.

## 💬 3. PLN y Transformers

- **PLN clásico:** tokenización, stopwords, lematización y análisis de sentimiento con NLTK, spaCy y TextBlob, y un chatbot de PLN.
- **Transformers:** pipelines de Hugging Face (sentimiento, generación, clasificación), tokenizadores y la Inference API.

## 🗨️ 4. LLMs y chatbots

- **Chatbots:** con la API de Groq, con modelos locales en Ollama y con memoria de conversación (LangChain y Streamlit).
- **Function calling:** clasificación y gestión de incidencias con salidas estructuradas de la API de OpenAI.
- **Batch API:** traducción masiva de un catálogo de productos con la Batch API de OpenAI.
- **Generación de contenido:** textos y SEO a partir de ficheros de entrada.
- **Observabilidad:** trazas, spans y métricas de una aplicación LLM con Langfuse y Groq.

## 📚 5. RAG y bases vectoriales

- **RAG con LangChain y Ollama:** fragmentación, embeddings y recuperación de contexto.
- **ChromaDB:** colecciones, búsquedas por similitud y uso de Chroma Cloud.
- **Chat con PDF:** preguntas sobre documentos con PyMuPDF, Groq y Streamlit.
- **RAG sobre la web:** carga de páginas con BeautifulSoup e indexación en Chroma.

## 🕵️ 6. Agentes de IA

- **CrewAI:** equipos de agentes con roles, tareas y herramientas propias, definidos en YAML.
- **Agente en Databricks:** un agente con herramientas propias registrado con MLflow.

## 🔌 7. MCP (Model Context Protocol)

- **Servidor MCP con FastMCP:** un primer servidor en Python.
- **App MCP para un gimnasio:** servidor con herramientas propias, APIs de terceros (Open-Meteo y Nager.Date) y herramientas de Google Sheets y Google Calendar, consumido desde una app en Streamlit.
- **MCP de mercados financieros:** servidor en Node.js con herramientas de cotizaciones, velas históricas y noticias.
- **MCP de noticias con Postman:** servidor en Node.js con el SDK oficial de MCP.
- **MCP sin código:** memoria de una integración MCP sin programación.

## ⚡ 8. Automatización con n8n

n8n autoalojado con Docker Compose junto a Ollama, Qdrant y PostgreSQL. Incluye cuatro flujos exportados: una alerta semanal de llamaradas solares con la API de la NASA, un lector del RSS de la BBC que envía notificaciones push con ntfy, un webhook que responde peticiones y un flujo programado contra una API. Más detalle en su [README](./08-Automatizacion-n8n).

## 🛠️ 9. Desarrollo con IA

- **Clean Code y SOLID:** refactorizaciones con Antigravity y OpenCode, eliminación de *code smells* y un flujo de agentes que guarda métricas en un servidor MCP con SQLite.
- **OpenCode:** proyectos web generados con agentes, entre ellos un panel con datos de las APIs de la NASA.
- **Skills para agentes:** skills propias para Antigravity (manuales y basadas en modelo) con su contexto operativo.

## 🖥️ 10. Interfaces

Interfaces web para probar modelos con **Gradio** y **Streamlit**.

---

## 🛠️ Stack tecnológico

- **Lenguajes:** Python, JavaScript (Node.js) y SQL.
- **Deep Learning:** TensorFlow / Keras, TensorFlow Hub, scikit-learn y Gymnasium.
- **PLN:** NLTK, spaCy, TextBlob y Hugging Face Transformers.
- **LLMs:** OpenAI API, Groq, Ollama (Llama 3.2) y Langfuse.
- **RAG y agentes:** LangChain, ChromaDB, Qdrant y CrewAI.
- **MCP:** FastMCP, MCP SDK (Python y Node.js) y Postman.
- **Automatización:** n8n y Docker Compose.
- **Interfaces:** Streamlit y Gradio.
- **Desarrollo con IA:** OpenCode, Antigravity y skills para agentes.

> Las claves de API no se incluyen en el repositorio. Para ejecutar los proyectos, crea un fichero `.env` con tus propias claves (por ejemplo `GROQ_API_KEY` u `OPENAI_API_KEY`).
