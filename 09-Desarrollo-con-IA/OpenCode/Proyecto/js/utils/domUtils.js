/**
 * Selecciona el primer elemento que coincida con el selector CSS
 * @param {string} selector - Selector CSS válido
 * @returns {Element|null} Elemento encontrado o null
 */
const $ = (selector) => document.querySelector(selector);

/**
 * Limpia el contenido HTML de un elemento
 * @param {Element} element - Elemento a limpiar
 */
const clearElement = (element) => {
    if (element) element.innerHTML = '';
};

/**
 * Crea un elemento HTML con clases y atributos personalizados
 * @param {string} tag - Etiqueta HTML (ej: 'div', 'button')
 * @param {string} [className=''] - Nombres de clases CSS separadas por espacios
 * @param {Object} [attributes={}] - Objeto con atributos: {textContent, innerHTML, attr: value}
 * @returns {Element} Elemento HTML creado
 * 
 * @example
 * const btn = createElement('button', 'btn btn-primary', {textContent: 'Enviar'});
 */
const createElement = (tag, className = '', attributes = {}) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    
    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'textContent' || key === 'innerHTML') {
            el[key] = value;
        } else {
            el.setAttribute(key, value);
        }
    }
    return el;
};

/**
 * Añade una clase a un elemento
 * @param {Element} el - Elemento HTML
 * @param {string} className - Nombre de la clase a añadir
 */
const addClass = (el, className) => {
    if (el) el.classList.add(className);
};

/**
 * Elimina una clase de un elemento
 * @param {Element} el - Elemento HTML
 * @param {string} className - Nombre de la clase a eliminar
 */
const removeClass = (el, className) => {
    if (el) el.classList.remove(className);
};

/**
 * Muestra un elemento estableciendo display a valor por defecto
 * @param {Element} el - Elemento HTML a mostrar
 */
const showElement = (el) => {
    if (el) el.style.display = '';
};

/**
 * Oculta un elemento estableciendo display a 'none'
 * @param {Element} el - Elemento HTML a ocultar
 */
const hideElement = (el) => {
    if (el) el.style.display = 'none';
};

export { $, clearElement, createElement, addClass, removeClass, showElement, hideElement };