/**
 * Servicio EONET (Earth Observatory Natural Event Tracker)
 * Obtiene información sobre eventos naturales de la Tierra
 * Responsabilidad: Obtener y transformar datos de eventos naturales
 */

import { fetchWithErrorHandling } from '../api/apiClient.js';
import { buildEonetUrl } from '../api/endpoints.js';

/**
 * Obtiene eventos naturales recientes de la Tierra
 * Filtra solo eventos con descripción disponible
 * @async
 * @returns {Promise<Array>} Array de eventos con: title, description, date, link, category
 * @throws {Error} Si la API falla o no retorna datos válidos
 * 
 * @example
 * const events = await fetchEonetEvents();
 * console.log(events[0].category); // "Wildfires"
 */
export const fetchEonetEvents = async () => {
    const response = await fetchWithErrorHandling(buildEonetUrl());
    if (!response.success) throw new Error(response.error);
    const events = response.data?.events || [];
    return events
        .slice(0, 10)
        .map(event => ({
            title: event.title,
            description: event.description || 'Sin descripción disponible',
            date: event.geometries && event.geometries[0] ? new Date(event.geometries[0].date).toLocaleDateString() : 'Fecha desconocida',
            link: event.sources && event.sources[0] ? event.sources[0].url : null,
            category: event.categories && event.categories[0] ? event.categories[0].title : 'Evento'
        }));
};