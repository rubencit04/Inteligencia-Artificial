// Traducir todos los productos de productos.json
import 'dotenv/config'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { traducirProducto } from './traduccion2.js';

// Ruta del fichero actual
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Ruta del productos .json
const filePath = path.join(dirname,'productos/productos.json');

// Nos traenmos el contenido del fichero .json
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err){
        console.error(err);
    }
    const products = JSON.parse(data);

    products.forEach( async product => {
        const translatedProduct = await traducirProducto(product);
        console.log(translatedProduct);
    });
});
