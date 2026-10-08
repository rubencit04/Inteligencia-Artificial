/**
 * Servicio DONKI (Database of Notifications, Knowledge, Information)
 * Obtiene información sobre clima espacial, especialmente Solar Flares
 * Responsabilidad: Obtener y transformar datos de actividad solar
 */

import { fetchWithErrorHandling } from '../api/apiClient.js';
import { buildDonkiUrl } from '../api/endpoints.js';

/**
 * Obtiene eventos de Solar Flares (erupciones solares) de los últimos 30 días
 * @async
 * @returns {Promise<Array>} Array de solar flares con: flrID, beginTime, classType, note
 * @throws {Error} Si la API falla o no retorna datos válidos
 * 
 * @example
 * const flares = await fetchDonki();
 * console.log(flares[0].classType); // "M5.2"
 */
export const fetchDonki = async () => {
    const today = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const response = await fetchWithErrorHandling(buildDonkiUrl(startDate, today));
    if (!response.success) throw new Error(response.error);
    const flares = Array.isArray(response.data) ? response.data : [];
    return flares.slice(0, 10).map(flr => ({
        flrID: flr.flrID,
        beginTime: flr.beginTime ? new Date(flr.beginTime).toLocaleString() : 'Desconocida',
        classType: flr.classType,
        note: flr.note || 'Sin nota'
    }));
};