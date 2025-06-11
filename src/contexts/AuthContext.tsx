'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import authService, { LoginData } from '@/services/auth.service';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: number;
  status: number;
  profile_photo_path?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (loginData: LoginData) => Promise<{ success: boolean; error?: unknown }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom event for data refresh
const REFRESH_DATA_EVENT = 'refreshCommonData';

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(() => {
    try {
      const currentUser = authService.getCurrentUser();
      const isAuth = authService.isAuthenticated();
      
      if (currentUser && isAuth) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    checkAuthStatus();
    setIsLoading(false);
  }, [checkAuthStatus]);

  // Memoize route arrays
  const routes = useMemo(() => ({
    public: ['/', '/about', '/contact', '/products'],
    auth: ['/login', '/signup', '/forgot-password'],
    admin: ['/admin'],
    user: ['/cart', '/profile', '/orders']
  }), []);

  // Memoize route checks
  const isPublicRoute = useMemo(() => {
    return routes.public.some(route => 
      pathname === route || pathname.startsWith('/products/')
    );
  }, [pathname, routes.public]);

  const isAuthRoute = useMemo(() => {
    return routes.auth.some(route => 
      pathname.startsWith(route)
    );
  }, [pathname, routes.auth]);

  const isAdminRoute = useMemo(() => 
    routes.admin.some(route => pathname.startsWith(route)),
    [pathname, routes.admin]
  );

  const isUserRoute = useMemo(() => 
    routes.user.some(route => pathname.startsWith(route)),
    [pathname, routes.user]
  );

  // Handle route protection
  useEffect(() => {
    if (isLoading) return;

    const handleRouting = async () => {
      // If user is logged in and tries to access auth routes (login/signup)
      if (isAuthenticated && isAuthRoute) {
        const isAdmin = user?.role === 1;
        // Redirect to appropriate dashboard based on role
        await router.replace(isAdmin ? '/admin/dashboard' : '/');
        return;
      }

      // For protected routes, check authentication
      if (!isAuthenticated && (isAdminRoute || isUserRoute)) {
        toast.error('Please login to access this page');
        await router.replace(`/login?returnUrl=${pathname}`);
        return;
      }

      if (isAuthenticated && user) {
        const isAdmin = user.role === 1;

        if (isAdminRoute && !isAdmin) {
          toast.error('You do not have permission to access this page');
          await router.replace('/');
          return;
        }

        if (!isAdminRoute && isAdmin) {
          await router.replace('/admin/dashboard');
          return;
        }
      }
    };

    handleRouting();
  }, [isAuthenticated, user, isAdminRoute, isUserRoute, isAuthRoute, isPublicRoute, isLoading, router, pathname]);

  const login = async (data: LoginData) => {
    try {
      const { token, user: userData } = await authService.login(data);
      
      if (!userData) {
        throw new Error('No user data received');
      }

      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      
      // Dispatch custom event to refresh common data
      window.dispatchEvent(new Event(REFRESH_DATA_EVENT));
      
      // Show success message
      toast.success('Login successful!');

      // Immediate navigation based on role
      if (userData.role === 1) {
        router.replace('/admin/dashboard');
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl');
        
        if (returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//')) {
          router.replace(returnUrl);
        } else {
          router.replace('/');
        }
      }

      return { success: true };
    } catch (error: any) {
      setUser(null);
      setIsAuthenticated(false);
      
      // Handle specific error messages
      const errorMessage = error.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      
      console.error('Login error:', {
        message: error.message,
        error
      });
      
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      // First clear the auth state
      setUser(null);
      setIsAuthenticated(false);

      // Then call the logout service
      await authService.logout();
      
      // Clear any stored data
      window.dispatchEvent(new Event(REFRESH_DATA_EVENT));
      
      // Force a re-check of auth status
      checkAuthStatus();
      
      // Finally redirect to login
      await router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout');
      
      // Even if there's an error, clear the state
      setUser(null);
      setIsAuthenticated(false);
      await router.replace('/login');
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 