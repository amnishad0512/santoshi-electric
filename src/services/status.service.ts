import api from '@/lib/axios';

interface StatusResponse {
  brandStatus: any[];
  categoryStatus: any[];
  productStatus: any[];
}

class StatusService {
  private static instance: StatusService;

  private constructor() {}

  static getInstance() {
    if (!StatusService.instance) {
      StatusService.instance = new StatusService();
    }
    return StatusService.instance;
  }

  async getAllStatuses() {
    const response = await api.get<StatusResponse>('/status');
    return response;
  }
}

export default StatusService.getInstance(); 