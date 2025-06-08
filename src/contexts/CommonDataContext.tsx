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

const defaultStatuses: Status[] = [
  { id: 1, name: 'Active', value: 1 },
  { id: 2, name: 'Inactive', value: 0 },
];

const CommonDataContext = createContext<CommonData | undefined>(undefined);

// Define the event name (must match the one in AuthContext)
const REFRESH_DATA_EVENT = 'refreshCommonData';

export function CommonDataProvider({ children }: { children: React.ReactNode }) {
  const [statuses, setStatuses] = useState<Status[]>(defaultStatuses);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatuses = async () => {
    try {
      // Try to fetch from API
      const response = await api.get('/status');
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setStatuses(response.data);
      }
    } catch (error) {
      console.error('Error fetching statuses:', error);
      // If API fails, use default statuses
      setStatuses(defaultStatuses);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchStatuses(),
        // Add other common data fetching here
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error('Failed to refresh common data');
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