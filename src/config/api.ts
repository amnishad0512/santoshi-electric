const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  VERIFY_TOKEN: `${API_BASE_URL}/auth/verify`,
  
  // User endpoints
  USER_PROFILE: `${API_BASE_URL}/user/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/user/profile`,
  CHANGE_PASSWORD: `${API_BASE_URL}/user/password`,
  UPLOAD_PROFILE_IMAGE: `${API_BASE_URL}/user/profile/image`,
  
  // Helper function to get user specific endpoints
  getUserEndpoint: (endpoint: string) => `${API_BASE_URL}/user/${endpoint}`,
} as const;

export const getAuthHeader = (token?: string) => {
  if (!token) {
    // Try to get token from localStorage
    token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}; 