import axios from 'axios';
import Cookies from 'js-cookie';

const isServer = typeof window === 'undefined';

// Create axios instance
const api = axios.create({
  baseURL: 'https://santoshielectric.in/api/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Skip token handling during static generation
    if (isServer) {
      return config;
    }

    // Get token from Cookies
    const token = Cookies.get('token');
    
    // If token exists, add it to request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // If the request contains FormData, remove the Content-Type header
    // to let the browser set it automatically with the boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // Skip token refresh during static generation
    if (isServer) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = Cookies.get('refresh_token');
        if (refreshToken) {
          const response = await api.post('/auth/refresh-token', {
            refresh_token: refreshToken,
          });

          const { token } = response.data;
          Cookies.set('token', token, { 
            path: '/',
            secure: true,
            sameSite: 'Lax',
            expires: 1
          });

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (error) {
        // If refresh token fails, logout user
        Cookies.remove('token', { path: '/' });
        Cookies.remove('refresh_token', { path: '/' });
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api; 