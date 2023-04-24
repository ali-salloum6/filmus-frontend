/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "image.tmdb.org",
      "upload.wikimedia.org",
      "i2-prod.dailyrecord.co.uk",
    ],
  },
};

module.exports = nextConfig;
