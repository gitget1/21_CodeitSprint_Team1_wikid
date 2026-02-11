import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const instance = axios.create({
  baseURL: 'https://wikied-api.vercel.app/21-1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, (error) => {
  return Promise.reject(error); 
});

export default instance;
