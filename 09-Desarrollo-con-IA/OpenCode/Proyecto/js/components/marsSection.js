import { createElement, clearElement } from '../utils/domUtils.js';
import { fetchMarsPhotos } from '../services/marsService.js';

const renderMars = async (container) => {
    clearElement(container);
    container.innerHTML = '<div class="loading"><p>Contactando con Curiosity...</p></div>';

    try {
        const photos = await fetchMarsPhotos(); // Este ya devuelve el array .slice(0,20)
        clearElement(container);

        const grid = createElement('div', 'mars-grid');
        if (photos.length === 0) {
            container.innerHTML = '<h2>📸 Marte</h2><p>No hay fotos disponibles para esta fecha.</p>';
            return;
        }

        photos.forEach(photo => {
            const card = createElement('div', 'mars-card');
            card.innerHTML = `
                <div class="img-container">
                    <img src="${photo.img_src}" alt="Mars Photo" loading="lazy">
                </div>
                <div class="mars-info">
                    <p><strong>Cámara:</strong> ${photo.camera.full_name}</p>
                    <p><strong>Fecha:</strong> ${photo.earth_date}</p>
                </div>
            `;
            grid.appendChild(card);
        });

        container.innerHTML = '<h2>📸 Exploración de Marte</h2>';
        container.appendChild(grid);
    } catch (error) {
        container.innerHTML = `<div class="error-message">Error cargando Marte: ${error.message}</div>`;
    }
};

export { renderMars };