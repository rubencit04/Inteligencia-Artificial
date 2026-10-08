/**
 * Servicio APOD (Astronomy Picture of the Day)
 * Obtiene la imagen astronomía del día de la NASA
 * Responsabilidad: Obtener y validar datos de APOD desde la API
 */

import { fetchWithErrorHandling } from '../api/apiClient.js';
import { buildApodUrl } from '../api/endpoints.js';

/**
 * Obtiene la imagen del día (APOD) de la NASA
 * @async
 * @returns {Promise<Object>} Objeto APOD con propiedades: title, url, explanation, date, media_type
 * @throws {Error} Si la API falla o devuelve datos inválidos
 * 
 * @example
 * const apod = await fetchApod();
 * console.log(apod.title); // "Título de la imagen"
 */
export const fetchApod = async () => {
    const url = buildApodUrl();
    const response = await fetchWithErrorHandling(url);

    if (!response.success) {
        throw new Error(response.error);
    }

    return response.data;
};