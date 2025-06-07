import api from '@/lib/axios';

export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  phone_number: string;
  role: number;
  status: number;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone_number?: string;
  role?: number;
  status?: number;
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

  async getAllUsers() {
    const response = await api.get<User[]>('/users');
    return response;
  }

  async getUserById(id: string) {
    console.log(id)
    const response = await api.get<User>(`/users/${id}`);
    return response;
  }

  async createUser(data: CreateUserData) {
    const response = await api.post<User>('/users', data);
    return response;
  }

  async updateUser(id: string, data: UpdateUserData) {
    const response = await api.put<User>(`/users/${id}`, data);
    return response;
  }

  async deleteUser(id: string) {
    const response = await api.delete(`/users/${id}`);
    return response;
  }

  async updateUserStatus(id: string, status: number) {
    const response = await api.patch<User>(`/users/${id}/status`, { status });
    return response;
  }
}

export default UserService.getInstance(); 