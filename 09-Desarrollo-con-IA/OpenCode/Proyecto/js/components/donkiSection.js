/**
 * Componente DONKI: Clima Espacial (Solar Flares)
 * Responsabilidad: Renderizar listado de erupciones solares
 */

import { createElement, clearElement } from '../utils/domUtils.js';
import { fetchDonki } from '../services/donkiService.js';

/**
 * Renderiza la sección de clima espacial
 * Muestra Solar Flares (erupciones solares) de los últimos 30 días
 * @async
 * @param {Element} container - Elemento contenedor
 * @returns {void} Modifica el DOM con eventos de clima espacial
 */
const getSeverityData = (classType) => {
    const type = classType ? classType.charAt(0).toUpperCase() : 'A';
    if (type === 'X') return { badge: '💥 Extrema', isHazardous: true };
    if (type === 'M') return { badge: '⚠️ Fuerte', isHazardous: true };
    if (type === 'C') return { badge: '⚡ Moderada', isHazardous: false };
    return { badge: '☀️ Menor', isHazardous: false };
};

const renderDonki = async (container) => {
    clearElement(container);
    container.innerHTML = '<div class="loading"><p>Obteniendo datos del clima espacial...</p></div>';

    try {
        const flrs = await fetchDonki();
        clearElement(container);

        const list = createElement('div', 'asteroid-grid'); // Reutilizamos tu clase CSS de grid
        flrs.forEach(flr => {
            const item = createElement('article', 'asteroid-card'); // Reutilizamos tu tarjeta
            const severity = getSeverityData(flr.classType);
            const badgeClass = severity.isHazardous ? 'hazardous' : '';
            
            item.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title">Erupción Solar</h3>
                    <span class="hazard-badge ${badgeClass}">${severity.badge} (${flr.classType})</span>
                </div>
                <div class="card-data">
                    <div class="data-row"><dt>ID:</dt><dd style="font-size: 0.8em">${flr.flrID}</dd></div>
                    <div class="data-row"><dt>Detección:</dt><dd>${flr.beginTime}</dd></div>
                    <div class="data-row" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                        <dt>Análisis de NASA:</dt>
                        <dd style="text-align: left; font-size: 0.9em; line-height: 1.4; color: #aaa;">${flr.note}</dd>
                    </div>
                </div>
            `;
            list.appendChild(item);
        });

        container.innerHTML = '<h2>☀️ Clima Espacial (DONKI)</h2>';
        container.appendChild(list);
    } catch (error) {
        container.innerHTML = `<div class="error-message">Error cargando clima espacial: ${error.message}</div>`;
    }
};

export { renderDonki };