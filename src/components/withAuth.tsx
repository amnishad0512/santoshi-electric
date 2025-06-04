'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth.service';

type Role = 'admin' | 'user';

interface WithAuthProps {
  allowedRoles?: Role[];
  redirectTo?: string;
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { allowedRoles = [], redirectTo = '/login' }: WithAuthProps = {}
) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = () => {
        const isAuthenticated = authService.isAuthenticated();
        console.log(isAuthenticated);
        const user = authService.getCurrentUser();
        console.log(user);

        if (!isAuthenticated) {
          // Get current path for return URL
          const returnUrl = window.location.pathname;
          router.push(`${redirectTo}?from=${returnUrl}`);
          return;
        }

        // If roles are specified, check user role
        if (allowedRoles.length > 0 && user) {
          const userRole = user.role === 1 ? 'admin' : 'user';
          if (!allowedRoles.includes(userRole as Role)) {
            router.push('/');
            return;
          }
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
} 