import api from '@/lib/axios';

export interface SubSubCategory {
  id: string;
  sub_sub_category_name: string;
  category_id: string;
  sub_category_id: string;
  status: number;
  created_at: string;
  updated_at: string;
  products_count?: number;
}

export interface CreateSubSubCategoryData {
  sub_sub_category_name: string;
  category_id: string;
  sub_category_id: string;
  status: number;
}

export interface UpdateSubSubCategoryData {
  sub_sub_category_name?: string;
  category_id?: string;
  sub_category_id?: string;
  status?: number;
}

class SubSubCategoryService {
  private static instance: SubSubCategoryService;

  private constructor() {}

  static getInstance() {
    if (!SubSubCategoryService.instance) {
      SubSubCategoryService.instance = new SubSubCategoryService();
    }
    return SubSubCategoryService.instance;
  }

  async getAllSubSubCategories() {
    try {
      const response = await api.get('/subsubcategories');
      console.log('All SubSubCategories Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching subsubcategories:', error);
      throw error;
    }
  }

  async getSubSubCategoryById(id: string) {
    if (!id) {
      throw new Error('SubSubCategory ID is required');
    }

    try {
      console.log('Making API call to:', `/subsubcategories/${id}`);
      const response = await api.get(`/subsubcategories/${id}`);
      console.log('Get SubSubCategory By ID Response:', response);
      
      if (!response || !response.data) {
        throw new Error('No data received from API');
      }
      
      return response;
    } catch (error) {
      console.error(`Error fetching subsubcategory ${id}:`, error);
      throw error;
    }
  }

  async createSubSubCategory(data: CreateSubSubCategoryData) {
    try {
      const response = await api.post('/subsubcategories', data);
      return response;
    } catch (error) {
      console.error('Error creating subsubcategory:', error);
      throw error;
    }
  }

  async updateSubSubCategory(id: string, data: UpdateSubSubCategoryData) {
    if (!id) {
      throw new Error('SubSubCategory ID is required');
    }

    try {
      const response = await api.put(`/subsubcategories/${id}`, data);
      return response;
    } catch (error) {
      console.error(`Error updating subsubcategory ${id}:`, error);
      throw error;
    }
  }

  async deleteSubSubCategory(id: string) {
    if (!id) {
      throw new Error('SubSubCategory ID is required');
    }

    try {
      const response = await api.delete(`/subsubcategories/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting subsubcategory ${id}:`, error);
      throw error;
    }
  }
}

export default SubSubCategoryService.getInstance(); 