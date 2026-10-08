import 'dotenv/config';
import OpenAI from 'openai';
import { classificationSchemaResponses } from './schemas/classification-schema-responses.js';
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const incidencia = `
    No puedo acceder a mi cuenta. Olvidé la contraseña y no me llega el correo de recuperación.
    Es urgente porque tengo que enviar un informe.
`;
export async function clasificarIncidencia (mensaje) {

    const response = await openai.responses.create({
        model: 'gpt-5-nano',
        input: [
            {
                role: "developer",
                content: "Eres un sistema de soporte técnico creado para clasificar incidencias por urgencia (alta, media, baja), tema (por ejemplo login, facturación, red), y el equipo responsable (soporte técnico, facturación, infraestructura, etc.). Quiero además dos posibles respuestas, una para aportar una solución y la otra para decirle que estamos revisando su caso e indicando un tiempo de respuesta estimado según la complejidad del problema entre 1h y 24h "
            },
            {
                role: 'user',
                content: mensaje

            }
        ],
        text: {
            format: {
                type: 'json_schema',
                name: "incidencia_clasificada",
                schema: classificationSchemaResponses,
                strict:true
            }
        }
    });
    return JSON.parse(response.output_text);
}

clasificarIncidencia(incidencia)
    .then(resultado => {
        console.log("Clasificación de la incidencia");
        console.log(JSON.stringify(resultado,null,2))
    })
    .catch(err => {
        console.error("Error al clasificar incidencia", err.message);
    });