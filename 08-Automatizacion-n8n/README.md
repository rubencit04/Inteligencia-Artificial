# ⚡ Automatización con n8n

n8n autoalojado en local con el [Self-hosted AI Starter Kit](https://github.com/n8n-io/self-hosted-ai-starter-kit), que levanta con Docker Compose:

| Servicio | Para qué |
| --- | --- |
| **n8n** | Orquestar los flujos |
| **Ollama** (Llama 3.2) | Modelo de lenguaje en local, sin coste por uso |
| **Qdrant** | Base de datos vectorial |
| **PostgreSQL** | Datos internos de n8n |

## Flujos

Los flujos están exportados en [`workflows/`](./workflows). Para usarlos, impórtalos en n8n (*Import from file*).

| Flujo | Disparador | Qué hace |
| --- | --- | --- |
| [`alerta-llamaradas-solares-nasa.json`](./workflows/alerta-llamaradas-solares-nasa.json) | Cada lunes a las 9:00 | Consulta las llamaradas solares de los últimos 7 días en la API DONKI de la NASA, comprueba su clase y envía un aviso |
| [`rss-bbc-a-ntfy.json`](./workflows/rss-bbc-a-ntfy.json) | Manual | Lee el RSS de BBC News, limita los resultados y manda cada titular como notificación push con ntfy |
| [`webhook-respuesta.json`](./workflows/webhook-respuesta.json) | Webhook | Recibe una petición, añade un campo procesado y responde al cliente |
| [`cita-diaria-api.json`](./workflows/cita-diaria-api.json) | Cada día a las 9:00 | Pide una cita a una API REST y filtra las respuestas vacías |

> Las credenciales (por ejemplo la clave de la API de la NASA) no se incluyen. Al importar el flujo, n8n te pedirá crear las tuyas.
