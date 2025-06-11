export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: number; // 0: user, 1: admin
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  role: number;
  status: number;
  profile_photo_path: string;
  created_at: string;
  updated_at: string;
  last_login: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
} 