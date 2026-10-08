/**
 * Componente Rastreador de Asteroides
 * Responsabilidad: Renderizar búsqueda y listado de asteroides
 */

import { clearElement, createElement } from '../utils/domUtils.js';
import { fetchAsteroids } from '../services/asteroidsService.js';
import { renderAsteroidGrid } from './asteroidGrid.js';
import { renderStats } from './asteroidStats.js';
import { getToday } from '../utils/dateUtils.js';

/**
 * Valida que un rango de fechas sea válido
 * @param {string} start - Fecha de inicio (YYYY-MM-DD)
 * @param {string} end - Fecha de fin (YYYY-MM-DD)
 * @returns {boolean} True si es válido, false si start > end
 * @private
 */
const validateDateRange = (start, end) => {
    if (!start || !end) {
        return { valid: false, error: "Debes seleccionar ambas fechas" };
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    
    if (startDate > endDate) {
        return { valid: false, error: "La fecha de inicio no puede ser posterior a la fecha final" };
    }
    
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
        return { valid: false, error: "El rango máximo permitido por la NASA es de 7 días" };
    }
    
    return { valid: true };
};

/**
 * Renderiza la sección de rastreador de asteroides
 * Incluye inputs de fecha, botón de búsqueda, estadísticas y grid
 * @async
 * @param {Element} container - Elemento contenedor
 * @returns {void} Modifica el DOM con búsqueda de asteroides
 * 
 * @description
 * - Inicializa con fechas de hoy
 * - Valida rango de fechas antes de buscar
 * - Muestra estadísticas de peligrosidad
 * - Renderiza grid de asteroides o mensajes de error
 */
const renderAsteroidsSection = (container) => {
    clearElement(container);

    container.innerHTML = `
        <section class="search-section">
            <h2>☄️ Rastreador de Asteroides</h2>
            <div class="search-controls">
                <input type="date" id="start-date" class="date-input" aria-label="Fecha de inicio de búsqueda">
                <input type="date" id="end-date" class="date-input" aria-label="Fecha de fin de búsqueda">
                <button id="search-button" class="btn-primary" aria-label="Buscar asteroides">Buscar</button>
            </div>
        </section>
        <section id="asteroid-stats" class="stats-container"></section>
        <div id="asteroid-grid" class="asteroid-grid"></div>
    `;

    const searchButton = container.querySelector('#search-button');
    const startDateInput = container.querySelector('#start-date');
    const endDateInput = container.querySelector('#end-date');
    const today = getToday();
    
    startDateInput.value = today;
    endDateInput.value = today;

    /**
     * Ejecuta la búsqueda de asteroides
     * Valida fechas y muestra resultados o errores
     * @async
     * @param {string} start - Fecha inicio
     * @param {string} end - Fecha fin
     */
    const searchAsteroidsAction = async (start, end) => {
        // Validar rango de fechas
        const validation = validateDateRange(start, end);
        if (!validation.valid) {
            renderAsteroidGrid([], false, `Error: ${validation.error}`);
            return;
        }

        try {
            const asteroids = await fetchAsteroids(start, end);
            renderAsteroidGrid(asteroids, false, null);
            renderStats(asteroids);
        } catch (error) {
            renderAsteroidGrid([], false, error.message);
        }
    };

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        searchAsteroidsAction(startDateInput.value, endDateInput.value);
    });

    // Búsqueda inicial con fecha de hoy
    searchAsteroidsAction(today, today);
};

export { renderAsteroidsSection };