// next.config.js
/** @type {import('next').NextConfig} */
// const nextConfig = {
  output: 'export', // Важно для GitHub Pages!
  trailingSlash: true,
  images: {
    unoptimized: true // Важно для экспорта!
  }
}

module.exports = nextConfig
