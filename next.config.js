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
  // Add base path and asset prefix if needed
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig 