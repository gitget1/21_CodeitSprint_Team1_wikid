import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://wikied-api.vercel.app/21-1',
  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
