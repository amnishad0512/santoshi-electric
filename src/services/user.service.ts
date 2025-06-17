import api from '@/lib/axios';

export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  profile_photo_path?: string;
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
  profile_photo_path?: string;
}

class UserService {
  private static instance: UserService;
  private apiUrl: string;

  private constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  }

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  private async authHeader() {
    // Add your authentication logic here
    return {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
  }

  async getAllUsers() {
    const response = await api.get<User[]>('/users');
    return response;
  }

  async getUserById(id: string) {
    console.log(id)
    const response = await api.get<User>(`/users/${id}`);
    console.log(response)
    return response.data;
  }

  async createUser(data: CreateUserData | FormData) {
    const config = data instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    
    const response = await api.post<User>('/users', data, config);
    return response;
  }

  async updateUser(id: string, data: UpdateUserData | FormData) {
    const config = data instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    
    const response = await api.post<User>(`/users/${id}`, data, config);
    return response;
  }

  async updateUserPUT(id: string, data: UpdateUserData | FormData) {
    const config = data instanceof FormData 
      ? { headers: { 'Content-Type': 'application/json' } }
      : {};
    
    const response = await api.put<User>(`/users/${id}`, data, config);
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