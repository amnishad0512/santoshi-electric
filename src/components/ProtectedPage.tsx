'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth.service';
import statusService from '@/services/status.service';
import { useStatus } from '@/contexts/StatusContext';
import { toast } from 'react-hot-toast';

interface ProtectedPageProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'user' | 'guest')[];
}

export default function ProtectedPage({
  children,
  allowedRoles = [],
}: ProtectedPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { setStatuses } = useStatus();

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const { data } = await statusService.getAllStatuses();
        const { brandStatus, categoryStatus, userStatus, orderStatus, couponStatus } = data;
        setStatuses(brandStatus, categoryStatus, userStatus, orderStatus, couponStatus);
      } catch (error) {
        console.error('Error fetching statuses:', error);
        toast.error('Failed to load status data');
      }
    };

    const checkAuth = async () => {
      const isAuthenticated = authService.isAuthenticated();
      const user = authService.getCurrentUser();

      if (isAuthenticated && user) {
        const userRole = user.role === 1 ? 'admin' : user.role === 2 ? 'user' : 'guest';
        
        // Only check role access if roles are specified
        if (allowedRoles.length > 0 && !allowedRoles.includes(userRole as 'admin' | 'user' | 'guest')) {
          setIsLoading(false);
          return;
        }

        // Fetch statuses for authenticated users
        await fetchStatuses();
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []); // Only run on mount

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
} 