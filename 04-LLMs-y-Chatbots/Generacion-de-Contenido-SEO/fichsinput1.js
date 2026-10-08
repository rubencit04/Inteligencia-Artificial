// fichero de entrada en pdf
// mandamos el contenido del fichero en base 64

import 'dotenv/config';
import OpenAI from 'openai';
import fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const pdfPath = path.join(dirname, "files", "frameworks.pdf");

const data = fs.readFileSync(pdfPath);
const base64String = data.toString("base64");

const client = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
});

const response = await client.responses.create({
    model: "gpt-5-nano",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: "Dame las palabras clave separadas por comas para utilizar en la etiqueta META de una web. Dame sólo la información que te pide el cliente",
                },

                {
                    type: "input_file",
                    filename: "frameworks.pdf",
                    file_data: `data:application/pdf;base64,${base64String}`,
                },
            ],
        },
    ],
});

console.log(response.output_text);