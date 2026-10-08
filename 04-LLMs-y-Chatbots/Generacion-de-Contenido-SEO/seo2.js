// Generamos la META Keywords y la META description sobre la información que tenemos en contenido.js
// Me devuelve la info en un json según un json Schema indicado al modelo
import 'dotenv/config';
import OpenAI from 'openai';
import {contenido} from './contenido.js'

const client = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
});

async function generarContenidoSeo(texto){
    const response = await client.responses.create({
        model: "gpt-5-nano",
        input: [
            {
                content: "Eres un asistente para crear contenido SEO sobre textos que te van a proporcionar los usuarios. Quiero que me des las palabras separadas por comas, como las pondrías en una etiqueta META keywords. También deberás proporcionar la etiqueta META description. Cuando respondas entrega únicamente el dato que te ha pedido el cliente, en este caso solo el contenido de la etiqueta meta.",
                role: "developer",
            },
            {
                content: texto,
                role: "user",
            },
        ],
        text: {
            format: {
                type: "json_schema",
                name: "SEO_info",
                schema: {
                    type: "object",
                    properties: {
                        keywords: {
                            type: "string",
                            description: "Palabras clave separadas por coma, en minúsculas",
                        },
                        description: {
                            type: "string",
                            description: "Descripción en una frase, adecuada para usar como etiqueta META"
                        },
                    },
                    required: ["keywords", "description"],
                    additionalProperties: false,
                },
                strict: true,
            }
        }
    });
    return response.output_text;
}

const respuesta = await generarContenidoSeo(contenido)
console.log(respuesta)

