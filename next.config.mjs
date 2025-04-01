/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com', 'aigurulab.tech'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'aigurulab.tech',
            pathname: '**',
          }
        ],
      },
};

export default nextConfig;
