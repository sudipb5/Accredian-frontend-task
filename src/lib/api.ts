import axios from 'axios';

const API_URL = import.meta.env.MODE === 'production' 
  ? import.meta.env.VITE_PROD_API_URL 
  : import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const endpoints = {
  referrals: '/api/referrals',
}; 