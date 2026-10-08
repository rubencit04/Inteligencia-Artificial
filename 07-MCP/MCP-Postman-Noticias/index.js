import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

const POSTMAN_MOCK_URL = "https://4fcdf177-c615-45ef-98bc-ff2ea7aa75c5.mock.pstmn.io";
const API_TOKEN = "mi-token-super-secreto";

const server = new Server({
  name: "servidor-practica-mcp",
  version: "1.0.0"
}, {
  capabilities: { tools: {} }
});

// 1. Herramientas
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_top_news",
        description: "Obtiene las últimas noticias publicadas (GET)",
        inputSchema: { type: "object", properties: {} }
      },
      {
        name: "submit_news_tip",
        description: "Envía un chivatazo o pista para una noticia (POST)",
        inputSchema: {
          type: "object",
          properties: { titular: { type: "string", description: "El titular de la pista" } },
          required: ["titular"]
        }
      },
      {
        name: "create_issue",
        description: "Crea una nueva tarea o incidencia en el sistema (POST)",
        inputSchema: {
          type: "object",
          properties: {
            title: { type: "string", description: "Título de la incidencia" },
            priority: { type: "string", enum: ["low", "medium", "high"], description: "Prioridad" }
          },
          required: ["title", "priority"]
        }
      },
      {
        name: "get_wiki_page",
        description: "Busca una página de documentación en la wiki (GET)",
        inputSchema: {
          type: "object",
          properties: { slug: { type: "string", description: "Identificador de la página" } },
          required: ["slug"]
        }
      },
      {
        name: "get_admin_stats",
        description: "Obtiene estadísticas administrativas protegidas (Requiere Token)",
        inputSchema: { type: "object", properties: {} }
      }
    ]
  };
});

// 2. Ejecución
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (request.params.name === "get_top_news") {
      const response = await axios.get(`${POSTMAN_MOCK_URL}/news`);
      return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
    } 
    
    if (request.params.name === "submit_news_tip") {
      const response = await axios.post(`${POSTMAN_MOCK_URL}/tips`, request.params.arguments);
      return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
    }

    if (request.params.name === "create_issue") {
      const response = await axios.post(`${POSTMAN_MOCK_URL}/issues`, request.params.arguments);
      return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
    }

    if (request.params.name === "get_wiki_page") {
      const { slug } = request.params.arguments;
      const response = await axios.get(`${POSTMAN_MOCK_URL}/wiki`, { params: { page: slug } });
      return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
    }

    if (request.params.name === "get_admin_stats") {
      const response = await axios.get(`${POSTMAN_MOCK_URL}/admin/stats`, {
        headers: { "Authorization": `Bearer ${API_TOKEN}` }
      });
      return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
    }

    throw new Error("Herramienta no encontrada");
  } catch (error) {
    return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);