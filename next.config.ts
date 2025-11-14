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
    ],
  },
  // --- BATAS TAMBAHAN ---
};

module.exports = nextConfig;
