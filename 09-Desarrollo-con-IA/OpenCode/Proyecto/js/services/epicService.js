import { fetchWithErrorHandling } from '../api/apiClient.js';
import { buildEpicUrl, buildEpicImageUrl } from '../api/endpoints.js';

export const fetchEpicImages = async () => {
    const response = await fetchWithErrorHandling(buildEpicUrl());
    if (!response.success) throw new Error(response.error);
    return response.data.slice(0, 10).map(img => ({
        caption: img.caption,
        date: img.date,
        imageUrl: buildEpicImageUrl(img.date, img.image)
    }));
};