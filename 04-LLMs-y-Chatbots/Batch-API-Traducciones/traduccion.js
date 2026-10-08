// Resultados sin json schema
import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function traducirProducto(product){
    const response = await client.responses.create({
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

    });
    return response.output_text;
}