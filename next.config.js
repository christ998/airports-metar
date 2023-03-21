/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

}

module.exports = {
  env: {
    TOKEN: process.env.REACT_APP_TOKEN,
    METAR_TOKEN: process.env.REACT_APP_METAR
  }
}
