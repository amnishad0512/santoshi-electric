import api from '@/lib/axios';

export interface Reply {
  id: string;
  message: string;
  createdAt: string;
  adminName: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: 'order' | 'customer' | 'payment' | 'delivery';
  status: 'pending' | 'resolved' | 'in_progress';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
  userId: string;
  userName: string;
}

export interface ReportFilters {
  category?: 'order' | 'customer' | 'payment' | 'delivery';
  status?: 'pending' | 'resolved' | 'in_progress';
  priority?: 'low' | 'medium' | 'high';
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateReplyInput {
  reportId: string;
  message: string;
}

export interface UpdateReportStatusInput {
  reportId: string;
  status: 'pending' | 'resolved' | 'in_progress';
}

class ReportService {
  private static instance: ReportService;

  private constructor() {}

  static getInstance() {
    if (!ReportService.instance) {
      ReportService.instance = new ReportService();
    }
    return ReportService.instance;
  }

  // Get reports with filtering and pagination
  async getReports(filters: ReportFilters = {}): Promise<{ 
    reports: Report[]; 
    total: number;
    totalPages: number;
  }> {
    try {
      const response = await api.get<{
        reports: Report[];
        total: number;
        totalPages: number;
      }>('/reports', { params: filters });
      return response;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  }

  // Get a single report by ID
  async getReportById(id: string): Promise<Report> {
    try {
      const response = await api.get<Report>(`/reports/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching report:', error);
      throw error;
    }
  }

  // Add a reply to a report
  async addReply(data: CreateReplyInput): Promise<Reply> {
    try {
      const response = await api.post<Reply>(`/reports/${data.reportId}/replies`, {
        message: data.message
      });
      return response;
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  }

  // Update report status
  async updateStatus(data: UpdateReportStatusInput): Promise<Report> {
    try {
      const response = await api.patch<Report>(`/reports/${data.reportId}/status`, {
        status: data.status
      });
      return response;
    } catch (error) {
      console.error('Error updating report status:', error);
      throw error;
    }
  }

  // Update report priority
  async updatePriority(reportId: string, priority: 'low' | 'medium' | 'high'): Promise<Report> {
    try {
      const response = await api.patch<Report>(`/reports/${reportId}/priority`, {
        priority
      });
      return response;
    } catch (error) {
      console.error('Error updating report priority:', error);
      throw error;
    }
  }
}

export default ReportService.getInstance(); 