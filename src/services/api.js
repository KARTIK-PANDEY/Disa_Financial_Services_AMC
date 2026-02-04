import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
};

export const investmentService = {
    createInvestment: (investmentData) => api.post('/investments', investmentData),
    getUserInvestments: (userId) => api.get(`/investments/${userId}`),
};

export const adminService = {
    getAllUsers: () => api.get('/admin/users'),
    getAllInvestments: () => api.get('/admin/investments'),
    getAllContacts: () => api.get('/admin/contacts'), // We need to add this to admin routes!
    getStats: () => api.get('/admin/stats'),
};

export const contactService = {
    submitContact: (data) => api.post('/contact', data)
};

export default api;
