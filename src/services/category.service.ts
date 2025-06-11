import api from '@/lib/axios';

export interface Category {
  id: string;
  category_name: string;
  category_icon: string;
  status: number;
  created_at: string;
  updated_at: string;
  products_count?: number;
  sub_categories_count?: number;
  sub_sub_categories_count?: number;
}

export interface CreateCategoryData {
  category_name: string;
  category_icon?: File;
  status: number;
}

export interface UpdateCategoryData {
  category_name?: string;
  category_icon?: File;
  status?: number;
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
    try {
      console.log('Fetching categories from API...');
      const response = await api.get('/categories');
      console.log('Categories API raw response:', response);
      return response.data;
    } catch (error) {
      console.error('Error in getAllCategories:', error);
      throw error;
    }
  }

  async getCategoryById(id: string) {
    if (!id) {
      throw new Error('Category ID is required');
    }

    try {
      const response = await api.get(`/categories/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  }

  async createCategory(data: CreateCategoryData) {
    try {
      const formData = new FormData();
      formData.append('category_name', data.category_name);
      formData.append('status', data.status.toString());
      if (data.category_icon) {
        formData.append('category_icon', data.category_icon);
      }

      const response = await api.post('/categories', formData);
      return response;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async updateCategory(id: string, data: UpdateCategoryData) {
    if (!id) {
      throw new Error('Category ID is required');
    }

    try {
      const formData = new FormData();
      if (data.category_name !== undefined) {
        formData.append('category_name', data.category_name);
      }
      if (data.status !== undefined) {
        formData.append('status', data.status.toString());
      }
      if (data.category_icon) {
        formData.append('category_icon', data.category_icon);
      }
      formData.append('_method', 'PUT');

      const response = await api.post(`/categories/${id}`, formData);
      return response;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  }

  async deleteCategory(id: string) {
    if (!id) {
      throw new Error('Category ID is required');
    }

    try {
      const response = await api.delete(`/categories/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  }
}

export default CategoryService.getInstance(); 