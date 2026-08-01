import axios from 'axios';

// يأخذ الرابط من ملف .env، وإذا لم يجده يستخدم localhost للتطوير المحلي
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

export default api;