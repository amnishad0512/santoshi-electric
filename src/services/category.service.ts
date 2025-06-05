import api from '@/lib/axios';

export interface Category {
  id: string;
  category_name: string;
  category_icon: string;
  createdAt?: string;
}

export interface CreateCategoryData {
  category_name: string;
  category_icon: string;
}

export interface UpdateCategoryData {
  category_name?: string;
  category_icon?: string;
}

class CategoryService {
  private static instance: CategoryService;

  private constructor() {}

  static getInstance() {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  async getAllCategories() {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  }

  async getCategoryById(id: string) {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  }

  async createCategory(data: CreateCategoryData) {
    const response = await api.post<Category>('/categories', data);
    return response.data;
  }

  async updateCategory(id: string, data: UpdateCategoryData) {
    const response = await api.put<Category>(`/categories/${id}`, data);
    return response.data;
  }

  async deleteCategory(id: string) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  }
}

export default CategoryService.getInstance(); 