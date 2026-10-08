// Generamos la META Keuwords sobre la información que tenemos en contenido.js
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
                content: "Eres un asistente para crear contenido SEO sobre textos que te van a proporcionar los usuarios. Quiero que me des las palabras separadas por comas, como las pondrías en una etiqueta META keywords. Cuando repondas entrega únicamente el dato que te ha pedido el cliente, en este caso solo el contenido de la etiqueta meta",
                role: "developer",
            },
            {
                content: texto,
                role: "user",
            },
        ]
    });
    return response.output_text;
}

const respuesta = await generarContenidoSeo(contenido)
console.log(respuesta)

