/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- TAMBAHKAN BAGIAN INI ---
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**", // Izinkan semua path di domain ini
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // <-- Tambahkan domain baru di sini
        port: "",
        pathname: "/**",
      },
    ],
  },
  // --- BATAS TAMBAHAN ---
};

module.exports = nextConfig;
