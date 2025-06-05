/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [], // Add your image domains here if needed
  },
  // This ensures that the app works with or without trailing slashes
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default config;
