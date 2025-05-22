import api from '@/lib/axios';

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

export interface AuthResponse {
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
    const response = await api.post<AuthResponse>('/auth/login', data);
    const {token, refresh_token, user} = response.data;
    if (token) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  }

  async signup(data: SignupData) {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    return response.data;
  }

  async forgotPassword(data: ForgotPasswordData) {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  }

  async resetPassword(token: string, password: string) {
    const response = await api.post('/auth/reset-password', {
      token,
      password,
    });
    return response.data;
  }

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
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
    return !!localStorage.getItem('auth_token');
  }
}

export default new AuthService(); 