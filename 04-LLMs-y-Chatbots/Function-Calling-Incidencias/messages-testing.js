import { clasificarIncidencia } from "./data-management-responses.js"

const incidencias = [
    "No puedo acceder al campus virtual desde el móvil, me da error de conexión",
    "No me puedo descargar el material del curso de Big Data",
   // "Los videos del curso de inteligencia artificial van muy lentos"
];

console.log("Simulación de gestión de varias incidencias");

for (let i = 0; i<incidencias.length; i++){
    const texto = incidencias[i];
    console.log(`Incidencias #${i + 1}`);
    console.log(' Solicitud: ${texto}\n');
    try {
        const resultado = await clasificarIncidencia(texto)
        console.log("Clasificación y respuesta");
        console.log(JSON.stringify(resultado,null,2));
        console.log("\n" + "-------------------" + "\n")
    } catch(error){
        console.error("Error al clasificar la incidencia", error.message);
    }
}