import { createElement, addClass } from '../utils/domUtils.js';

const createDetailRow = (label, value) => {
    const row = createElement('div', 'data-row');
    row.appendChild(createElement('dt', '', { textContent: label }));
    row.appendChild(createElement('dd', '', { textContent: value }));
    return row;
};

const createAsteroidCard = (asteroid) => {
    const card = createElement('article', 'asteroid-card');

    // Header
    const header = createElement('div', 'card-header');
    const title = createElement('h3', 'card-title', { textContent: asteroid.name });
    
    const badgeText = asteroid.isHazardous ? '⚠️ Peligroso' : '🛡️ Seguro';
    const badge = createElement('span', 'hazard-badge', { textContent: badgeText });
    if (asteroid.isHazardous) addClass(badge, 'hazardous');

    header.appendChild(title);
    header.appendChild(badge);

    // Detalles
    const details = createElement('div', 'card-data');
    
    // Formatear números
    const diameter = `${Math.round(asteroid.diameterMin)} - ${Math.round(asteroid.diameterMax)} m`;
    const velocity = `${Math.round(asteroid.velocity).toLocaleString()} km/h`;
    const distance = `${Math.round(asteroid.missDistance).toLocaleString()} km`;

    details.appendChild(createDetailRow('Diámetro:', diameter));
    details.appendChild(createDetailRow('Velocidad:', velocity));
    details.appendChild(createDetailRow('Distancia:', distance));

    card.appendChild(header);
    card.appendChild(details);

    return card;
};

export { createAsteroidCard };