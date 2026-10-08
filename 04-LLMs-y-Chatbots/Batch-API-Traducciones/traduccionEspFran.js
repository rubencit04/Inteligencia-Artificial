// Resultados con json schema
import 'dotenv/config';
import OpenAI from 'openai';
import { traductorSchema } from './schema/traductor-Schema.js';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function traducirProducto(product){
    const translations = {};
    const responseSpanish = await client.responses.create({
        model: "gpt-5-nano",
        input: [
            {
                role: "developer",
                content: "Eres un traductor profesional. Traduce el título y la descripción del producto al español manteniendo el tono promocional",
            },
            {
                role: 'user',
                content: JSON.stringify(product),

            },
        ],
        text: {
            format: {
                type: 'json_schema',
                name: "translated_product",
                schema: traductorSchema,
                strict: true
            }
        }
    });
    translations.spanish = JSON.parse(responseSpanish.output_text);

    const responseFrancais = await client.responses.create({ 
        model: "gpt-5-nano",
        previous_response_id: responseSpanish.id,
        input: [
            {
            role: 'user',
            content: 'Ahora traduce al francés',
            },
        ],
         text: {
            format: {
                type: 'json_schema',
                name: "translated_product",
                schema: traductorSchema,
                strict: true
            }
        }
    });
    translations.francais = JSON.parse(responseFrancais.output_text);
    return translations;
}