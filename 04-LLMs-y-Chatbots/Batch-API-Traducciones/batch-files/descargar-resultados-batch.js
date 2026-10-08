import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { obtenerObjetoBatch } from './obtener-objeto-batch.js';

// Ruta del fichero actual
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Ruta del productos .json
const resultPath = path.join(dirname,'../productos/batchResult.jsonl');

export async function descargarResultadosBatch (batchId){
    const batch = await obtenerObjetoBatch(batchId);
    const fileResponse = await client.files.content(batch.output_file_id);
    const text = await fileResponse.text();
    fs.writeFileSync(resultPath, text, 'utf8');
}
