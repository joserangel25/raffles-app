/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https'
      },
      {
        hostname: 'cdn.discordapp.com',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
