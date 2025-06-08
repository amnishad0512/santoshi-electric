import api from '@/lib/axios';

export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment: string;
  user: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    product_name: string;
  };
}

interface ReviewResponse {
  status: string;
  data: Review[];
}

interface SingleReviewResponse {
  status: string;
  data: Review;
}

export interface CreateReviewData {
  product_id: number;
  rating: number;
  comment: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

class ReviewService {
  private static instance: ReviewService;

  private constructor() {}

  static getInstance() {
    if (!ReviewService.instance) {
      ReviewService.instance = new ReviewService();
    }
    return ReviewService.instance;
  }

  async getAllReviews(): Promise<Review[]> {
    try {
      const response = await api.get<ReviewResponse>('/reviews');
      return response.data;
    } catch (error) {
      console.error('Error in getAllReviews:', error);
      return [];
    }
  }

  async getReviewById(id: number): Promise<Review | null> {
    try {
      const response = await api.get<SingleReviewResponse>(`/reviews/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error in getReviewById:', error);
      return null;
    }
  }

  async getReviewsByProduct(productId: number): Promise<Review[]> {
    try {
      const response = await api.get<ReviewResponse>(`/reviews/product/${productId}`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error in getReviewsByProduct:', error);
      return [];
    }
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    try {
      const response = await api.get<ReviewResponse>(`/reviews/user/${userId}`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error in getReviewsByUser:', error);
      return [];
    }
  }

  async createReview(data: CreateReviewData): Promise<Review | null> {
    try {
      const response = await api.post<SingleReviewResponse>('/reviews', data);
      return response.data.data;
    } catch (error) {
      console.error('Error in createReview:', error);
      return null;
    }
  }

  async updateReview(id: number, data: UpdateReviewData): Promise<Review | null> {
    try {
      const response = await api.put<SingleReviewResponse>(`/reviews/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error('Error in updateReview:', error);
      return null;
    }
  }

  async deleteReview(id: number): Promise<boolean> {
    try {
      await api.delete(`/reviews/${id}`);
      return true;
    } catch (error) {
      console.error('Error in deleteReview:', error);
      return false;
    }
  }

  async approveReview(id: string) {
    return this.updateReview(id, { status: 'approved' });
  }

  async rejectReview(id: string) {
    return this.updateReview(id, { status: 'rejected' });
  }
}

export default ReviewService.getInstance(); 