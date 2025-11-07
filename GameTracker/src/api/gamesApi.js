const API_URL = 'http://localhost:3000/games';

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

export const gamesAPI = {
    getAll: async () => {
        try {
        const response = await fetch(API_URL);
        return handleResponse(response);
        } catch (error) {
        return handleError(error);
        }
    },

    getById: async (id) => {
        try {
        const response = await fetch(`${API_URL}/${id}`);
        return handleResponse(response);
        } catch (error) {
        return handleError(error);
        }
    },

    create: async (gameData) => {
        try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        });
        return handleResponse(response);
        } catch (error) {
        return handleError(error);
        }
    },

    patch: async (id, gameData) => {
        try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
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
};
