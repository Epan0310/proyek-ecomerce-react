import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer"; // <-- 1. IMPORT FOOTER

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Fullstack Ecommerce with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 2. Tambahkan class 'flex flex-col min-h-screen' di <body> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* 3. Bungkus {children} dengan <main> */}
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer /> {/* <-- 4. Tampilkan Footer di sini */}
      </body>
    </html>
  );
}