import { createElement, clearElement } from '../utils/domUtils.js';
import { fetchEpicImages } from '../services/epicService.js';

const renderEpic = async (container) => {
    clearElement(container);
    container.innerHTML = '<div class="loading"><p>Obteniendo vistas de la Tierra...</p></div>';

    try {
        const images = await fetchEpicImages(); // Devuelve el array ya mapeado con imageUrl
        clearElement(container);

        const grid = createElement('div', 'epic-grid');
        images.forEach(img => {
            const card = createElement('div', 'epic-card');
            card.innerHTML = `
                <div class="img-container">
                    <img src="${img.imageUrl}" alt="Earth EPIC" loading="lazy">
                </div>
                <div class="epic-info">
                    <p class="date">${img.date}</p>
                    <small>${img.caption}</small>
                </div>
            `;
            grid.appendChild(card);
        });

        container.innerHTML = '<h2>🌍 La Tierra desde EPIC</h2>';
        container.appendChild(grid);

    } catch (error) {
        container.innerHTML = `<div class="error-message">Error cargando EPIC: ${error.message}</div>`;
    }
};

export { renderEpic };