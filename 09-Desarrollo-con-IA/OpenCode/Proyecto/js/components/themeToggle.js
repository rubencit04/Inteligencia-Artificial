import { $ } from '../utils/domUtils.js';

const initThemeToggle = () => {
    const toggleButton = $('#theme-toggle');
    const html = document.documentElement;
    const icon = toggleButton ? toggleButton.querySelector('.theme-icon') : null;
    const text = toggleButton ? toggleButton.querySelector('.theme-text') : null;

    const updateThemeUI = (theme) => {
        if (theme === 'dark') {
            if (icon) icon.textContent = '☀️';
            if (text) text.textContent = 'Modo Claro';
        } else {
            if (icon) icon.textContent = '🌙';
            if (text) text.textContent = 'Modo Oscuro';
        }
    };

    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    if (!toggleButton) return; // Evita que la app se rompa si no hay botón

    toggleButton.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
    });
};

export { initThemeToggle };