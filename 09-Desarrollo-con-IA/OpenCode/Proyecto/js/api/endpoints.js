/**
 * API_KEY: Clave de acceso a las APIs de NASA
 * BASE_URL: URL base para todas las peticiones a api.nasa.gov
 */
const API_KEY = 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov';

/**
 * Construye la URL para obtener la Astronomía del Día (APOD)
 * @returns {string} URL de APOD
 */
export const buildApodUrl = () => `${BASE_URL}/planetary/apod?api_key=${API_KEY}`;

/**
 * Construye la URL para obtener asteroides cercanos a la Tierra
 * @param {string} start - Fecha de inicio (YYYY-MM-DD)
 * @param {string} end - Fecha de fin (YYYY-MM-DD)
 * @returns {string} URL del feed de asteroides
 */
export const buildFeedUrl = (start, end) => `${BASE_URL}/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`;

/**
 * Construye la URL para obtener fotos del rover Curiosity en Marte
 * @param {string} date - Fecha en formato YYYY-MM-DD
 * @returns {string} URL de fotos de Marte
 */
export const buildMarsUrl = (date) => `${BASE_URL}/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`;

/**
 * Construye la URL para obtener imágenes EPIC (Earth Polychromatic Imaging Camera)
 * @returns {string} URL de imágenes EPIC
 */
export const buildEpicUrl = () => `${BASE_URL}/EPIC/api/natural/date/2019-05-30?api_key=${API_KEY}`;

/**
 * Construye la URL de la imagen EPIC
 * @param {string} date - Fecha en formato YYYY-MM-DD
 * @param {string} image - Nombre de la imagen
 * @returns {string} URL de la imagen
 */
export const buildEpicImageUrl = (date, image) => {
    const [year, month, day] = date.split(' ')[0].split('-');
    return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image}.png`;
};

/**
 * Construye la URL para buscar imágenes en la NASA Image Library
 * @param {string} query - Término de búsqueda
 * @returns {string} URL de búsqueda de imágenes
 */
export const buildImagesUrl = (query) => `https://images-api.nasa.gov/search?q=${query}&media_type=image`;

/**
 * Construye la URL para obtener eventos naturales de EONET
 * EONET no requiere API key
 * @returns {string} URL de eventos naturales
 */
export const buildEonetUrl = () => `https://eonet.gsfc.nasa.gov/api/v3/events?limit=10`;

/**
 * Construye la URL para obtener datos de clima espacial (Solar Flares) de DONKI
 * @param {string} start - Fecha de inicio (YYYY-MM-DD)
 * @param {string} end - Fecha de fin (YYYY-MM-DD)
 * @returns {string} URL de solar flares
 */
export const buildDonkiUrl = (start, end) => `${BASE_URL}/DONKI/FLR?startDate=${start}&endDate=${end}&api_key=${API_KEY}`;