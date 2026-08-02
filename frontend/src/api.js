import axios from 'axios';


const api = axios.create({
  baseURL: 'https://miakelle-salon-backend.onrender.com',
});

export default api;