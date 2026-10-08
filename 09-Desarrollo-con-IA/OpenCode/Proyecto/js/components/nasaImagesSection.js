import { createElement, clearElement } from '../utils/domUtils.js';
import { fetchNasaImages } from '../services/nasaImagesService.js';

const renderNasaImages = async (container) => {
    clearElement(container);
    container.innerHTML = '<div class="loading"><p>Buscando imágenes de la NASA...</p></div>';

    try {
        const images = await fetchNasaImages();
        clearElement(container);

        const grid = createElement('div', 'images-grid');
        images.forEach(img => {
            const card = createElement('div', 'image-card');
            card.innerHTML = `
                <div class="img-container">
                    <img src="${img.imageUrl}" alt="${img.title}" loading="lazy">
                </div>
                <div class="image-info">
                    <h3>${img.title}</h3>
                    <p>${img.description}</p>
                </div>
            `;
            grid.appendChild(card);
        });

        container.innerHTML = '<h2>🖼️ Biblioteca de Imágenes NASA</h2>';
        container.appendChild(grid);
    } catch (error) {
        container.innerHTML = `<div class="error-message">Error cargando imágenes: ${error.message}</div>`;
    }
};

export { renderNasaImages };