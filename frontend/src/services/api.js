import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for future token handling
api.interceptors.request.use(config => {
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Health
export const checkHealth = () => api.get('/health');

// Calculator
export const calculateFootprint = (data) => api.post('/calculator/calculate', data);

// Dashboard
export const getDashboardData = () => api.get('/dashboard/data');

// Goals
export const addGoal = (data) => api.post('/goals', data);

export default api;
