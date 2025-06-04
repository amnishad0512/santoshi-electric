'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import authService from '@/services/auth.service';

interface ProtectedPageProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'user' | 'guest')[];
  redirectTo?: string;
}

export default function ProtectedPage({
  children,
  allowedRoles = [],
}: ProtectedPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // // Skip auth check for login and signup pages
    // if (pathname === '/login' || pathname === '/signup') {
    //   setIsLoading(false);
    //   return;
    // }

    const isAuthenticated = authService.isAuthenticated();
    const user = authService.getCurrentUser();

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (allowedRoles.length > 0 && user) {
      const userRole = user.role === 1 ? 'admin' : user.role === 2 ? 'user' : 'guest';
      if (!allowedRoles.includes(userRole as 'admin' | 'user' | 'guest')) {
        if (user.role === 1) {
          router.push('/admin/dashboard');
        } else if (user.role === 2) {
          router.push('/');
        } else {
          router.push('/login');
        }
        return;
      }
    }

    setIsLoading(false);
  }, [pathname]); // Only re-run when pathname changes

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  return <>{children}</>;
} 