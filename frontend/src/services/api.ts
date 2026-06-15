import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type {
  CarbonCalculationRequest,
  CarbonCalculationResponse,
  DashboardData,
  APIResponse,
} from '../types';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for future token handling
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<{ error?: string; message?: string }>) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Health
export const checkHealth = (): Promise<APIResponse<{ status: string; version: string }>> =>
  api.get('/health');

// Calculator
export const calculateFootprint = (
  data: CarbonCalculationRequest
): Promise<APIResponse<CarbonCalculationResponse>> => api.post('/calculator/calculate', data);

// Dashboard
export const getDashboardData = (): Promise<APIResponse<DashboardData>> =>
  api.get('/dashboard/data');

// Goals
export const addGoal = (data: Record<string, unknown>): Promise<APIResponse<unknown>> =>
  api.post('/goals', data);

export default api;
