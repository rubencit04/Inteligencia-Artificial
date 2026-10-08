// Resultados con json schema
import { traducirProducto } from "./traduccion2.js";

const product = {
    "title": "Mario Tennis Fever",
    "description": "Join Mario and friends for over-the-top tennis mayhem! Use topspins, slices, lobs, and other familiar shots—along with other fancy footwork and new defensive maneuvers—to outpace your opponents on the court. ",
    "image": "https://static-ca.gamestop.ca/images/products/803634/3max.jpg"
};

const translatedProduct = await traducirProducto(product);
console.log(translatedProduct);