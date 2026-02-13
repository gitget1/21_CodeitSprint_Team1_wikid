import axios from 'axios';
import { setupRequestInterceptor, setupResponseInterceptor } from './axios.interceptors';

/**
 * Axios 인스턴스 생성 및 설정
 */
const instance = axios.create({
  baseURL: 'https://wikied-api.vercel.app/21-1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터 설정
setupRequestInterceptor(instance);
setupResponseInterceptor(instance);

export default instance;
