import api from '@/lib/axios';
import {
  User,
  UserProfile,
  ChangePasswordData,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '@/types/user';

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone_number?: string;
  profile_photo_path?: string;
}

interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T;
}

class UserService {
  private static instance: UserService;

  private constructor() {}

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  // Auth methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    const { data } = response.data;
    this.saveToken(data.token);
    return data;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    const { data } = response.data;
    this.saveToken(data.token);
    return data;
  }

  async logout(): Promise<void> {
    try {
      await api.post<ApiResponse<null>>('/auth/logout');
    } finally {
      this.removeToken();
    }
  }

  async verifyToken(): Promise<User | null> {
    try {
      const response = await api.get<ApiResponse<{ user: User }>>('/auth/verify');
      return response.data.data.user;
    } catch (error) {
      this.removeToken();
      return null;
    }
  }

  // Profile methods
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<ApiResponse<UserProfile>>('/profile');
    return response.data.data;
  }

  async updateProfile(formData: FormData): Promise<UserProfile> {
    const response = await api.post<ApiResponse<UserProfile>>('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!response.data || !response.data.data) {
      throw new Error('Invalid response from server');
    }
    return response.data.data;
  }

  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    await api.post<ApiResponse<null>>('/user/password', payload);
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    const response = await api.get<ApiResponse<Order[]>>('/user/orders');
    return response.data.data;
  }

  async getOrderById(orderId: string): Promise<Order> {
    const response = await api.get<ApiResponse<Order>>(`/user/orders/${orderId}`);
    return response.data.data;
  }

  // Token management
  private saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
}

export default UserService.getInstance(); 