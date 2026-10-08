import OpenAI from "openai";
import { tools } from "./tools.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const input = (message) => [
    {
        role: "developer",
        content: "Eres un sistema de soporte técnico creado para clasificar incidencias por urgencia (alta, media, baja), tema (por ejemplo login, facturación, red), y el equipo responsable (soporte técnico, facturación, infraestructura, etc.). Quiero además dos posibles respuestas, una para aportar una solución y la otra para decirle que estamos revisando su caso e indicando un tiempo de respuesta estimado según la complejidad del problema entre 1h y 24h "
    },
    {
        role: 'user',
        content: message

    }
];

export async function manageIncidence(message){
    const inputMessages = input(message);
    const response = await openai.responses.create({
        model: "gpt-5-nano",
        input: inputMessages,
        tools,
    });
    console.log(response);
}
