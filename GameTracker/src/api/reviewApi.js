const API_URL = 'http://localhost:3000/review';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
        throw new Error(error.message || `Error ${response.status}`);
    }
    return response.json();
};

const handleError = (error) => {
    console.error('API Error:', error);
    throw error;
    };

export const reviewAPI = {

    getAll: async () => {
        try {
        const response = await fetch(API_URL);
        return handleResponse(response);
        } catch (error) {
        return handleError(error);
        }
    },
}