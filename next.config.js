/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports
  images: {
    unoptimized: true, // Required for static export
    domains: ['santoshielectric.in'], // Add your image domains here
  },
  // Handle dynamic routes in static export
  trailingSlash: true,
  // Disable dynamic routes that aren't pre-rendered
  experimental: {
    missingSuspenseWithCSRError: false,
  },
}

module.exports = nextConfig 