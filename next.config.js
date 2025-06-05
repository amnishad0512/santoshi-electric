/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports
  images: {
    unoptimized: true, // Required for static export
    domains: ['santoshielectric.in'], // Add your image domains here
  },
  // Disable server-side features in static export
  experimental: {
    appDir: true,
  },
  // Handle dynamic routes in static export
  trailingSlash: true,
}

module.exports = nextConfig 