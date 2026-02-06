import axios from 'axios';

const TEAM_ID = '21-1';

const instance = axios.create({
  baseURL: `https://wikied-api.vercel.app/${TEAM_ID}`,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default instance;
