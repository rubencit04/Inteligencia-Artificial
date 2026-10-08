import { fetchWithErrorHandling } from '../api/apiClient.js';
import { buildImagesUrl } from '../api/endpoints.js';

export const fetchNasaImages = async () => {
    const response = await fetchWithErrorHandling(buildImagesUrl('mars'));
    if (!response.success) throw new Error(response.error);
    const items = response.data?.collection?.items || [];
    return items.slice(0, 10).map(item => ({
        title: item.data?.[0]?.title || 'Sin título',
        description: item.data?.[0]?.description || 'Sin descripción',
        imageUrl: item.links?.[0]?.href || ''
    }));
};