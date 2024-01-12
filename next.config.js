/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  reactStrictMode: false,
  env: {
    UNSPLASH_API_KEY: process.env.UNSPLASH_API_KEY,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    PLACES_API_KEY: process.env.PLACES_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['openweathermap.org'],
  },
}

