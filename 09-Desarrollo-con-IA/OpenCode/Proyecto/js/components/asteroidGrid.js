import { $, clearElement, showElement, hideElement, createElement } from '../utils/domUtils.js';
import { createAsteroidCard } from './asteroidCard.js';

const GRID_ID = 'asteroid-grid';
const LOADING_ID = 'loading';
const ERROR_ID = 'error-message';

const showLoading = () => {
    const grid = $(`#${GRID_ID}`);
    const loading = $(`#${LOADING_ID}`);
    const error = $(`#${ERROR_ID}`);
    
    clearElement(grid);
    hideElement(error);
    if (loading) {
        showElement(loading);
    } else if (grid) {
        grid.innerHTML = `<div id="${LOADING_ID}" class="loading"><p>Buscando asteroides...</p></div>`;
    }
};

const showError = (message) => {
    const grid = $(`#${GRID_ID}`);
    const loading = $(`#${LOADING_ID}`);
    const error = $(`#${ERROR_ID}`);
    
    hideElement(loading);
    if (error) {
        error.textContent = message;
        showElement(error);
        clearElement(grid);
    } else if (grid) {
        grid.innerHTML = `<div id="${ERROR_ID}" class="error-message">${message}</div>`;
    }
};

const showAsteroids = (asteroids) => {
    const grid = $(`#${GRID_ID}`);
    const loading = $(`#${LOADING_ID}`);
    const error = $(`#${ERROR_ID}`);
    
    hideElement(loading);
    hideElement(error);
    clearElement(grid);
    
    if (asteroids.length === 0) {
        grid.appendChild(createElement('p', 'no-results', { 
            textContent: 'No se encontraron asteroides para el rango de fechas seleccionado.' 
        }));
        return;
    }
    
    asteroids.forEach(asteroid => {
        const card = createAsteroidCard(asteroid);
        grid.appendChild(card);
    });
};

const renderAsteroidGrid = (asteroids, isLoading = false, error = null) => {
    if (isLoading) {
        showLoading();
    } else if (error) {
        showError(error);
    } else {
        showAsteroids(asteroids);
    }
};

export { renderAsteroidGrid, showLoading, showError, showAsteroids };
