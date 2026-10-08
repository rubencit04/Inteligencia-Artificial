/**
 * Componente EONET: Eventos Naturales de la Tierra
 * Responsabilidad: Renderizar listado de eventos naturales
 */

import { createElement, clearElement } from '../utils/domUtils.js';
import { fetchEonetEvents } from '../services/eonetService.js';

/**
 * Renderiza la sección de eventos naturales
 * Muestra eventos como incendios, tormentas, volcanes, etc.
 * @async
 * @param {Element} container - Elemento contenedor
 * @returns {void} Modifica el DOM con eventos naturales
 * 
 * @description
 * - Filtra solo eventos con descripción
 * - Muestra categoría, fecha y descripción
 * - Incluye enlace a más información cuando disponible
 * - Maneja errores de API
 */
const getCategoryIcon = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('storm') || cat.includes('cyclone')) return '🌀';
    if (cat.includes('fire') || cat.includes('wildfire')) return '🔥';
    if (cat.includes('volcano')) return '🌋';
    if (cat.includes('ice') || cat.includes('iceberg')) return '🧊';
    if (cat.includes('earthquake')) return '💥';
    return '🌍';
};

const renderEonet = async (container) => {
    clearElement(container);
    container.innerHTML = '<div class="loading"><p>Obteniendo eventos naturales de la Tierra...</p></div>';

    try {
        const events = await fetchEonetEvents();
        clearElement(container);

        const list = createElement('div', 'asteroid-grid'); // Reutilizamos tu clase CSS de grid
        events.forEach(event => {
            const item = createElement('article', 'asteroid-card'); // Reutilizamos tu tarjeta
            const icon = getCategoryIcon(event.category);
            item.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title" style="font-size: 1.1em;">${icon} ${event.title}</h3>
                    <span class="hazard-badge">${event.category}</span>
                </div>
                <div class="card-data">
                    <div class="data-row"><dt>Fecha:</dt><dd>${event.date}</dd></div>
                    <div class="data-row" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                        <dt>Descripción:</dt>
                        <dd style="text-align: left; font-size: 0.9em; line-height: 1.4; color: #aaa;">${event.description}</dd>
                    </div>
                    ${event.link ? `<div style="margin-top: 15px; text-align: center;"><a href="${event.link}" target="_blank" rel="noopener noreferrer" style="color: #4da6ff; text-decoration: none; font-weight: bold;">Ver fuente oficial 🔗</a></div>` : ''}
                </div>
            `;
            list.appendChild(item);
        });

        container.innerHTML = '<h2>🌍 Eventos Naturales (EONET)</h2>';
        container.appendChild(list);
    } catch (error) {
        container.innerHTML = `<div class="error-message">Error cargando eventos: ${error.message}</div>`;
    }
};

export { renderEonet };