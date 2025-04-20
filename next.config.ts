/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configurations you might have
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Protocol used by the URL
        hostname: 'openweathermap.org',
        port: '', // Usually empty unless specified in the URL
        pathname: '/img/wn/**', // Allows any path starting with /img/wn/
      },
      // Add other patterns here if needed for other domains
    ],
  },
};

module.exports = nextConfig;