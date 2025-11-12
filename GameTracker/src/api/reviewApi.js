const API_URL = 'https://gametracker-backend-yqzs.onrender.com/review';

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
        const response = await fetch(`${API_URL}/6904e48d10dcfca0449d3361`);
        return handleResponse(response);
        } catch (error) {
        return handleError(error);
        }
    },
    
    create: async (reviewData) => {
        try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        return handleResponse(response);
        } catch (error) {
        return handleError(error);
        }
    },

    patch: async (gameId, reviewData) => {  
        try {
        const response = await fetch(`${API_URL}/${gameId}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        return handleResponse(response);
        } catch (error) {
        return handleError(error);
        }
    },

    delete: async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    } catch (error) {
    return handleError(error);
    }
    },
}