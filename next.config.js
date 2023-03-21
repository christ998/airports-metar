/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  }
}

module.exports = {
  env: {
    TOKEN: process.env.REACT_APP_TOKEN,
    METAR_TOKEN: process.env.REACT_APP_METAR
  }
}
