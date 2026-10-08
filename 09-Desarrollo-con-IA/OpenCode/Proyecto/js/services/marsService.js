// marsService.js
import { fetchWithErrorHandling } from '../api/apiClient.js';
import { buildMarsUrl } from '../api/endpoints.js';

export const fetchMarsPhotos = async () => {
    const response = await fetchWithErrorHandling(buildMarsUrl('2012-08-07'));
    if (!response.success) throw new Error(response.error);
    return response.data.photos ? response.data.photos.slice(0, 20) : [];
};