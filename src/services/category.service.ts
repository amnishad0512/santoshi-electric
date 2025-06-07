import api from '@/lib/axios';

export interface Category {
  id: string;
  category_name: string;
  category_icon: string;
  brand_id: string;
  status: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryData {
  category_name: string;
  category_icon: string | File;
  brand_id: string;
  status: boolean;
}

export interface UpdateCategoryData {
  category_name?: string;
  category_icon?: string | File;
  brand_id?: string;
  status?: boolean;
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
      const response = await api.get('/categories');
      console.log('All Categories Response:', response); // Debug log
      return response.data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getCategoryById(id: string) {
    if (!id) {
      throw new Error('Category ID is required');
    }

    try {
      console.log('Making API call to:', `/categories/${id}`); // Debug log
      const response = await api.get(`/categories/${id}`);
      console.log('Get Category By ID Response:', response); // Debug log
      
      if (!response || !response.data) {
        throw new Error('No data received from API');
      }
      
      return response;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  }

  async createCategory(data: CreateCategoryData) {
    const formData = new FormData();
    formData.append('category_name', data.category_name);
    formData.append('status', String(data.status));
    formData.append('brand_id', data.brand_id);
    
    if (data.category_icon instanceof File) {
      formData.append('category_icon', data.category_icon);
    } else {
      formData.append('category_icon', data.category_icon);
    }

    try {
      const response = await api.post('/categories', formData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async updateCategory(id: string, data: UpdateCategoryData) {
    if (!id) {
      throw new Error('Category ID is required');
    }

    const formData = new FormData();
    
    if (data.category_name) {
      formData.append('category_name', data.category_name);
    }
    
    if (typeof data.status !== 'undefined') {
      formData.append('status', String(data.status));
    }

    if (data.brand_id) {
      formData.append('brand_id', data.brand_id);
    }
    
    if (data.category_icon) {
      if (data.category_icon instanceof File) {
        formData.append('category_icon', data.category_icon);
      } else {
        formData.append('category_icon', data.category_icon);
      }
    }

    try {
      const response = await api.put(`/categories/${id}`, formData);
      return response.data;
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
      return response.data;
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  }
}

export default CategoryService.getInstance(); 