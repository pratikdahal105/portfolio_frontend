// api/Axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://portfolio-5cf2.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
