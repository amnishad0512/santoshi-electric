import Link from 'next/link';

export default function BrandDetailsLoading() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Users
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
        </div>

        {/* Loading Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-white/20 rounded w-48"></div>
                <div className="h-4 bg-white/20 rounded w-32"></div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index}>
                      <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                      <div className="h-5 bg-gray-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index}>
                      <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                      <div className="h-5 bg-gray-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 