import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Send cookies (JWT)
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // You could inject additional tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle Network Errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized (Token Expiration)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Auto logout if not on auth routes
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        toast.error('Session expired. Please log in again.');
        
        // Use Zustand store dynamically to avoid circular dependency
        const { useAuthStore } = await import('../store/authStore');
        useAuthStore.getState().logout();
        
        window.location.href = '/login';
      }
    }

    // Centralized Error Toasting (Optional: only for specific verbs)
    if (originalRequest.method !== 'get') {
      const message = error.response?.data?.message || 'Something went wrong';
      if (error.response.status !== 401) {
        toast.error(message);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
