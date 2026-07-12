import axios from 'axios';

// Default: backend runs at http://localhost:5000
// If you deploy elsewhere, update NEXT_PUBLIC/ VITE env accordingly.
const baseURL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;

