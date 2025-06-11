import api from '@/lib/axios';
import Cookies from 'js-cookie';

export interface LoginData {
  phone_number: string;
  password: string;
}

export interface SignupData {
  name: string;
  phone_number: string;
  email: string;
  password: string;
  role: number;
  status: number;
}

export interface ForgotPasswordData {
  phone_number: string;
}

export interface ChangePasswordData {
  password: string;
  password_confirmation: string;
  otp?: string;
}

export interface AuthResponse {
  token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    role: number;
  };
}

export interface ProfileResponse{
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: number;
  status: string;
  profile_photo_path?: string;
}

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  isAuthenticated() {
    const token = Cookies.get('token');
    return !!token;
  }

  getCurrentUser() {
    try {
      const userStr = Cookies.get('user');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      // If there's any error parsing the cookie, remove it and return null
      Cookies.remove('user', { path: '/' });
      return null;
    }
  }

  async login(data: LoginData) {
    try {
      const response = await api.post<AuthResponse>('/login', data);
   
      const { token } = response.data;

      // Validate response data
      if (!token) {
        throw new Error('Token is missing from response');
      }

      // Store in cookies with proper configuration
      Cookies.set('token', token, { 
        path: '/',
        secure: true,
        sameSite: 'Lax',
        expires: 1 // Set cookie to expire in 7 days
      });

      const userData = await api.get<ProfileResponse>('/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const user = userData.data

      if (!user || !user.id || !user.role) {
        throw new Error('Invalid user data in response');
      }
      
      Cookies.set('user', JSON.stringify(user), { 
        path: '/',
        secure: true,
        sameSite: 'Lax',
        expires: 1
      });
      return { token, user };
    } catch (error: any) {
      // Clear any existing auth cookies on error
      Cookies.remove('token', { path: '/' });
      Cookies.remove('user', { path: '/' });
      
        throw new Error(error.response.data.message || 'Login failed');
      
    }
  }

  async logout() {
    try {
      await api.post('/logout');
    } catch (error: any) {
      console.error(error.response.data.message || 'Logout failed');
    } finally {
      // Always clear cookies regardless of API call success
      Cookies.remove('token', { path: '/' });
      Cookies.remove('refresh_token', { path: '/' });
      Cookies.remove('user', { path: '/' });
      localStorage.clear();
    }
  }

  async signup(data: SignupData) {
    const response = await api.post<AuthResponse>('/register', data);
    return response.data;
  }

  async forgotPassword(data: ForgotPasswordData) {
    const response = await api.post('/forgot-password', data);
    return response.data;
  }

  async changePassword(data: ChangePasswordData) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await api.post('/change-password', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  async updateProfile(data: any, image?: File) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const formData = new FormData();
      
      // Add all profile data to FormData
      Object.keys(data).forEach(key => {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      });

      // Add image if provided
      if (image) {
        formData.append('profile_photo_path', image);
      }

      const response = await api.post<ProfileResponse>('/profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      const updatedUser = response.data;
      
      // Update stored user data
      Cookies.set('user', JSON.stringify(updatedUser), { 
        path: '/',
        secure: true,
        sameSite: 'Lax',
        expires: 1
      });

      return updatedUser;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Update profile failed');
    }
  }

  getUserRole() {
    const user = this.getCurrentUser();
    return user?.role || null;
  }
}

export default AuthService.getInstance(); 