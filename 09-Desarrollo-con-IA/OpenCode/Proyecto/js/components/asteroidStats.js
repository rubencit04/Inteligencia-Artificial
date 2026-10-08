import { $, createElement, clearElement } from '../utils/domUtils.js';

const STATS_ID = 'asteroid-stats';

const renderStats = (asteroids) => {
    const container = $(`#${STATS_ID}`);
    if (!container) return;
    
    clearElement(container);

    if (!asteroids || asteroids.length === 0) return;

    const total = asteroids.length;
    const hazardous = asteroids.filter(a => a.isHazardous).length;
    
    // Crear contenedor de métricas
    const wrapper = createElement('div', 'stats-wrapper');
    
    // Métrica 1: Total
    const totalEl = createElement('div', 'stat-item');
    totalEl.innerHTML = `<strong>Total:</strong> ${total}`;
    
    // Métrica 2: Peligrosos
    const hazardEl = createElement('div', 'stat-item');
    hazardEl.innerHTML = `<strong>Peligrosos:</strong> <span style="color: ${hazardous > 0 ? 'red' : 'green'}">${hazardous}</span>`;

    wrapper.appendChild(totalEl);
    wrapper.appendChild(hazardEl);
    container.appendChild(wrapper);
};

export { renderStats };
