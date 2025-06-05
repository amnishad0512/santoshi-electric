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
    const userStr = Cookies.get('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  async login(data: LoginData) {
    try {
      const response = await api.post<AuthResponse>('/login', data);
      const { token, user } = response.data;
      // Validate response data
      if (!token) {
        throw new Error('Token is missing from response');
      }
      if (!user || !user.id || !user.role) {
        throw new Error('Invalid user data in response');
      }

      // Store in cookies with proper configuration
      Cookies.set('token', token, { 
        path: '/',
        secure: true,
        sameSite: 'Lax',
        expires: 1 // Set cookie to expire in 7 days
      });
      
      Cookies.set('user', JSON.stringify(user), { 
        path: '/',
        secure: true,
        sameSite: 'Lax',
        expires: 1
      });
      return { token, user };
    } catch (error: any) {
      console.error('Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Clear any existing auth cookies on error
      Cookies.remove('token', { path: '/' });
      Cookies.remove('user', { path: '/' });

      // Throw a more informative error
      if (error.response?.status === 401) {
        throw new Error('Invalid credentials');
      } else if (error.response?.status === 422) {
        throw new Error('Invalid input data');
      } else if (!error.response) {
        throw new Error('Network error - please check your connection');
      } else {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
    }
  }

  async logout() {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear cookies regardless of API call success
      Cookies.remove('token', { path: '/' });
      Cookies.remove('refresh_token', { path: '/' });
      Cookies.remove('user', { path: '/' });
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

  getUserRole() {
    const user = this.getCurrentUser();
    return user?.role || null;
  }
}

export default AuthService.getInstance(); 