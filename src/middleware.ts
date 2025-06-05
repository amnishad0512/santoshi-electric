import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicPaths = ['/', '/about', '/contact', '/products'];
const authPaths = ['/login', '/signup', '/forgot-password'];
const adminPaths = ['/admin'];
const protectedPaths = ['/cart', '/profile', '/orders'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Check authentication status
  const token = request.cookies.get('token')?.value;
  const userStr = request.cookies.get('user')?.value;
  const user = userStr ? JSON.parse(userStr) : null;

  // Handle public routes
  if (publicPaths.includes(pathname) || pathname.startsWith('/products/')) {
    return NextResponse.next();
  }

  // Handle auth routes (login, signup, etc.)
  if (authPaths.some(path => pathname.startsWith(path))) {
    // If user is already authenticated, redirect based on role
    if (token && user) {
      if (user.role === 1) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Handle protected routes
  if (!token || !user) {
    // If trying to access protected route while not authenticated
    if (protectedPaths.some(path => pathname.startsWith(path)) || pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    if (user.role !== 1) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Allow access to other routes for authenticated users
  return NextResponse.next();
}

// Update config to exclude more paths
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api/ (API routes)
     * 2. /_next/ (Next.js internals)
     * 3. /_static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
}; 