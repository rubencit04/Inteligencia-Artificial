/**
 * Realiza una petición HTTP con manejo de errores integrado
 * Responsabilidad: Gestión centralizada de peticiones HTTP y errores de red/API
 * 
 * @async
 * @param {string} url - URL completa de la API a consultar
 * @returns {Promise<{success: boolean, data?: any, error?: string}>} 
 *          Objeto con resultado: {success: true, data: ...} o {success: false, error: "mensaje"}
 * 
 * @example
 * const result = await fetchWithErrorHandling('https://api.nasa.gov/planetary/apod?...');
 * if (result.success) {
 *   console.log(result.data); // Datos de la API
 * } else {
 *   console.error(result.error); // Mensaje de error
 * }
 */
export const fetchWithErrorHandling = async (url) => {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorMap = {
                400: "Petición incorrecta (400). Verifica los parámetros de búsqueda.",
                404: "Datos no encontrados en la NASA (404).",
                503: "Servidores de la NASA saturados (503)."
            };
            return { success: false, error: errorMap[response.status] || `Error HTTP: ${response.status}` };
        }
        
        const textData = await response.text();
        try {
            const jsonData = JSON.parse(textData);
            return { success: true, data: jsonData };
        } catch (jsonError) {
            return { success: false, error: "La NASA devolvió un formato no válido." };
        }
    } catch (error) {
        return { success: false, error: "Fallo de conexión. Revisa tu internet." };
    }
};