import { PrismaClient } from "@prisma/client";

// Deklarasikan 'global' untuk TypeScript
declare global {
  var prisma: PrismaClient | undefined;
}

// Mencegah koneksi baru dibuat setiap kali ada hot-reload di development
export const prisma =
  global.prisma ||
  new PrismaClient({
    // Opsional: Anda bisa aktifkan log untuk melihat query
    // log: ['query'],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
