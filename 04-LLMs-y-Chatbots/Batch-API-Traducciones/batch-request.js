// Encargamos el trabajo
import 'dotenv/config'

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generarJsonl } from './batch-files/generar-jsonl.js';
import { subirFichero } from './batch-files/subir-fichero.js';
import { generarBatch } from './batch-files/generar-batch.js';


// Ruta del fichero actual
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Ruta del productos .json
const inputPath = path.join(dirname,'productos/productos.json');
const jsonlPath = path.join(dirname,'productos/batchinput.jsonl');

const products = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const batchContent = generarJsonl(products)

fs.writeFileSync(jsonlPath, batchContent);
console.log("Generación del jsonl con éxito")

// #### Subir el jsonl y obtener un id de la tarea batch
const batchFileId = await subirFichero(jsonlPath);
const batchId = await generarBatch(batchFileId);
console.log(batchId);
// batch_69829766164081908dad891acf2681e9