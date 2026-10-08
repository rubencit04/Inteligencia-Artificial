// Trabajamos mandando parámetros al modelo.
// Le mandaremos como parámetro un país y obtenemos la info correspondiente
// Utilizamos jason schema para la salida
import 'dotenv/config';
import OpenAI from 'openai';

/*
Argumentos al ejecutar programa con node (process.argv)
[0] Ruta de node
[1] nombre completo del archivo
[2] Primer argumento o parámetro
[3] Segundo argumento o parámetro
.....
.....
*/

const client = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
});

const pais = process.argv[2];

if (!pais){
    console.error("Por favor, indica un pais. Ej: node paises.js Italia");
    process.exit(1);
}

async function infoPais(pais){
    try {
      const response = await client.responses.create({
        model: "gpt-5-nano",
        input: [
            {
                content: "Eres un asistente que da datos sobre países del mundo. Quiero saber la población, el continente, la capital, una descripción de 100 caracteres aproximadamente y el prefijo internacional para llamarlos por teléfono",
                role: "developer",
            },
            {
                content: `Dame información sobre el pais ${pais}`,
                role: "user",
            },
        ],
        text: {
            format: {
                type: "json_schema",
                name: "pais_info",
                schema: {
                    type: "object",
                    properties: {
                        nombre: { type: "string"},
                        capital: { type: "string"},
                        continente: { type: "string"},
                        poblacion: { type: "string"},
                        descripcion: { type: "string"},
                        prefijoTelefonoInternacional: { type: "integer"},
                    },
                    required: ["nombre", "capital", "continente", "poblacion", "descripcion", "prefijoTelefonoInternacional"],
                    additionalProperties: false,
                },
                strict: true,
            }
        }
      });
      console.log("$$$$$$$$$$ DATOS: $$$$$$$$$$$$");
      console.log(response.output_text);

    } catch (err){
        console.error(err);
    }
}

infoPais(pais)
