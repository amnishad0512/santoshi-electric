'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api from '@/lib/axios';

interface Status {
  id: number;
  name: string;
  value: number;
}

interface CommonData {
  statuses: Status[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const CommonDataContext = createContext<CommonData | undefined>(undefined);

// Define the event name (must match the one in AuthContext)
const REFRESH_DATA_EVENT = 'refreshCommonData';

export function CommonDataProvider({ children }: { children: React.ReactNode }) {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatuses = async () => {
    try {
      // TODO: Replace with your actual API endpoint
      const response = await api.get('/status');
      setStatuses(response.data);
    } catch (error) {
      console.error('Error fetching statuses:', error);
      toast.error('Failed to load common data');
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchStatuses(),
        // Add other common data fetching here
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();

    // Add event listener for refresh
    window.addEventListener(REFRESH_DATA_EVENT, refreshData);

    // Cleanup
    return () => {
      window.removeEventListener(REFRESH_DATA_EVENT, refreshData);
    };
  }, []);

  const value = {
    statuses,
    isLoading,
    refreshData,
  };

  return (
    <CommonDataContext.Provider value={value}>
      {children}
    </CommonDataContext.Provider>
  );
}

export function useCommonData() {
  const context = useContext(CommonDataContext);
  if (context === undefined) {
    throw new Error('useCommonData must be used within a CommonDataProvider');
  }
  return context;
} 