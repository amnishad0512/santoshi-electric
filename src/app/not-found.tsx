'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl p-8 text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">Sorry, we couldn't find the page you're looking for.</p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
} 