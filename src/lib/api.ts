// Using require-style import for axios
import type { AxiosInstance } from 'axios';
const axios = (await import('axios')).default;

const API_URL = import.meta.env.MODE === 'production' 
  ? import.meta.env.VITE_PROD_API_URL 
  : import.meta.env.VITE_API_URL;

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const endpoints = {
  referrals: '/api/referrals',
};
