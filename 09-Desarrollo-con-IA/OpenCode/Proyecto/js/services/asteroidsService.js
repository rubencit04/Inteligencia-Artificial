/**
 * Servicio de Asteroides NeoWs (Near Earth Object Web Service)
 * Obtiene información de asteroides cercanos a la Tierra
 * Responsabilidad: Obtener, validar y transformar datos de asteroides
 */

import { fetchWithErrorHandling } from '../api/apiClient.js';
import { buildFeedUrl } from '../api/endpoints.js';

/**
 * Transforma datos crudos del API a formato de visualización
 * @param {Object} neo - Objeto con datos del asteroide desde la API
 * @returns {Object} Asteroide transformado con propiedades legibles
 * @private
 */
const transformAsteroid = (neo) => ({
    id: neo.id,
    name: neo.name,
    isHazardous: neo.is_potentially_hazardous_asteroid,
    diameterMin: neo.estimated_diameter.meters.estimated_diameter_min,
    diameterMax: neo.estimated_diameter.meters.estimated_diameter_max,
    velocity: Math.round(parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour)),
    missDistance: Math.round(parseFloat(neo.close_approach_data[0].miss_distance.kilometers)),
    approachDate: neo.close_approach_data[0].close_approach_date_full
});

/**
 * Obtiene asteroides cercanos en un rango de fechas
 * @async
 * @param {string} startDate - Fecha de inicio (YYYY-MM-DD)
 * @param {string} endDate - Fecha de fin (YYYY-MM-DD)
 * @returns {Promise<Array>} Array de asteroides transformados
 * @throws {Error} Si la API falla o las fechas no son válidas
 * 
 * @example
 * const asteroids = await fetchAsteroids('2026-03-18', '2026-03-25');
 * console.log(asteroids[0].name); // "Asteroid Name"
 */
export const fetchAsteroids = async (startDate, endDate) => {
    const response = await fetchWithErrorHandling(buildFeedUrl(startDate, endDate));
    if (response.success && response.data.near_earth_objects) {
        return Object.values(response.data.near_earth_objects).flat().map(transformAsteroid);
    }
    throw new Error(response.error || "No se encontraron asteroides.");
};