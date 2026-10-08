import { initThemeToggle } from './components/themeToggle.js';
import { $, removeClass, addClass } from './utils/domUtils.js';
import { renderApod } from './components/apodSection.js';
import { renderAsteroidsSection } from './components/asteroidSection.js';
import { renderNasaImages } from './components/nasaImagesSection.js';
import { renderEonet } from './components/eonetSection.js';
import { renderDonki } from './components/donkiSection.js';

const ROUTES = {
    apod: renderApod,
    asteroids: renderAsteroidsSection,
    eonet: renderEonet,
    donki: renderDonki
};

const navigateTo = (viewName) => {
    const contentDiv = $('#app-content');
    const renderFunction = ROUTES[viewName];
    
    if (!contentDiv) {
        console.error("Contenedor #app-content no encontrado en el HTML.");
        return;
    }

    if (renderFunction) {
        // Limpiamos contenido previo antes de renderizar la nueva sección
        contentDiv.innerHTML = '<p class="loading">Cargando datos espaciales...</p>';
        renderFunction(contentDiv);
    }

    // Actualizar estado visual del menú
    document.querySelectorAll('.nav-btn').forEach(btn => {
        removeClass(btn, 'active');
        if (btn.dataset.view === viewName) addClass(btn, 'active');
    });
};

const initializeApp = () => {
    initThemeToggle();
    
    // Delegación de eventos para navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.dataset.view));
    });

    // Vista por defecto
    navigateTo('apod');
};

// Arranque seguro
document.readyState === 'loading' 
    ? document.addEventListener('DOMContentLoaded', initializeApp) 
    : initializeApp();