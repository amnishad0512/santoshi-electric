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
  private static instance: AuthService;
  private authState: boolean | null = null;
  private userData: any = null;

  private constructor() {}

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  isAuthenticated() {
    if (this.authState === null) {
      this.authState = !!Cookies.get('token');
    }
    return this.authState;
  }

  getCurrentUser() {
    if (this.userData === null) {
      const userStr = localStorage.getItem('user');
      this.userData = userStr ? JSON.parse(userStr) : null;
    }
    return this.userData;
  }

  async login(data: LoginData) {
    const response = await api.post<AuthResponse>('/login', data);
    const { token, refresh_token, user } = response.data;
    if (token) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      Cookies.set('token', token, { path: '/', secure: true, sameSite: 'Strict' });
      Cookies.set('user', JSON.stringify(user), { path: '/', secure: true, sameSite: 'Strict' });
      
      this.authState = true;
      this.userData = user;
    }
    return response.data;
  }

  async logout() {
    try {
      await api.post('/auth/logout');
      Cookies.remove('token');
      Cookies.remove('user');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      this.authState = false;
      this.userData = null;
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
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
    const response = await api.post('/verify-otp', data);
    return response.data;
  }
}

export default AuthService.getInstance(); 