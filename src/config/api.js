// API Configuration
// This file centralizes all API endpoint configuration

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
    IDEAS: `${API_BASE_URL}/ideas`,
    COMPONENTS: `${API_BASE_URL}/components`,
    COMMENTS: (ideaId) => `${API_BASE_URL}/ideas/${ideaId}/comments`,
    IDEA: (id) => `${API_BASE_URL}/ideas/${id}`,
    COMPONENT: (id) => `${API_BASE_URL}/components/${id}`
};

export default API_BASE_URL;

