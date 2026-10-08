/**
 * Obtiene la fecha actual en formato ISO (YYYY-MM-DD)
 * Utilizado para establecer valores por defecto en inputs de fecha
 * 
 * @returns {string} Fecha actual en formato YYYY-MM-DD
 * 
 * @example
 * const today = getToday(); // "2026-03-18"
 */
const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export { getToday };