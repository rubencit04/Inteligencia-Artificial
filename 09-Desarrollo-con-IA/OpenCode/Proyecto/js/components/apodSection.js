/**
 * Componente APOD: Astronomía del Día
 * Responsabilidad: Renderizar la imagen y descripción de APOD
 */

import { createElement, clearElement } from '../utils/domUtils.js';
import { fetchApod } from '../services/apodService.js';

/**
 * Renderiza la sección APOD con imagen/video y descripción
 * @async
 * @param {Element} container - Elemento contenedor donde renderizar
 * @returns {void} Modifica el DOM del container
 * 
 * @description
 * - Muestra spinner durante la carga
 * - Soporta videos e imágenes
 * - Muestra título, fecha y explicación
 * - Maneja errores de API mostrando mensaje de error
 */
const renderApod = async (container) => {
    clearElement(container);
    container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Cargando APOD...</p></div>';

    try {
        const data = await fetchApod();
        clearElement(container);

        const wrapper = createElement('div', 'apod-wrapper');
        const mediaContainer = createElement('div', 'apod-media');
        
        if (data.media_type === 'video') {
            mediaContainer.innerHTML = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            const img = createElement('img', 'apod-img');
            img.src = data.url;
            img.alt = data.title;
            mediaContainer.appendChild(img);
        }

        const info = createElement('div', 'apod-info');
        info.innerHTML = `
            <h2>${data.title}</h2>
            <p class="date"><strong>Fecha:</strong> ${data.date}</p>
            <p class="explanation">${data.explanation}</p>
        `;

        wrapper.appendChild(mediaContainer);
        wrapper.appendChild(info);
        container.appendChild(wrapper);

    } catch (error) {
        container.innerHTML = `<div class="error-message">Error cargando APOD: ${error.message}</div>`;
    }
};

export { renderApod };