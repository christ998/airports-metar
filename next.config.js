/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  eslint: false,
  env: {
    TOKEN: process.env.REACT_APP_TOKEN,
    METAR_TOKEN: process.env.REACT_APP_METAR
  }
}
