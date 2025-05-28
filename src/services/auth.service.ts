import api from '@/lib/axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

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
  data: any;
  token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone_number: string;
  };
}

class AuthService {
  async login(data: LoginData) {
    const response = await api.post<AuthResponse>('/login', data);
    const { token, refresh_token, user } = response.data;
    if (token) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
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
    const response = await api.post('/verify-otp', data);
    return response.data;
  }

  async logout() {
    try {
      await api.post('/auth/logout');
      Cookies.remove('token');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }


  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  isAuthenticated() {
    return !!Cookies.get('token');
  }
}

export default new AuthService(); 