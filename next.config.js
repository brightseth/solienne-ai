/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd14i3advvh2bvd.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'api.eden.art',
      },
      {
        protocol: 'https',
        hostname: 'eden-vault.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.eden.art',
      }
    ],
  },
}

module.exports = nextConfig