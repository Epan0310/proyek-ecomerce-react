"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// 1. IMPORT BARU: Kita tambahkan icon keranjang belanja
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

type UserProfile = {
  id: number;
  name: string;
  email: string;
  // Kita tambahkan 'image' agar bisa menampilkan foto profil asli nanti
  image?: string | null;
} | null;

export default function Navbar() {
  // --- LOGIKA ASLI ANDA (TIDAK BERUBAH SAMA SEKALI) ---
  const [user, setUser] = useState<UserProfile>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  // --- BATAS AKHIR LOGIKA ANDA ---

  // --- TAMPILAN JSX (DIMODIFIKASI) ---
  return (
    <nav className="w-full bg-gradient-to-br from-green-400 to-blue-600 text-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Kiri: Logo + Nav Links */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link href="/dashboard" className="text-xl font-bold text-white">
          MyShop
        </Link>

        {/* Nav Links (Biar tidak sepi) */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/dashboard"
            className="font-medium hover:text-gray-200 transition"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="font-medium hover:text-gray-200 transition"
          >
            Shop
          </Link>
        </div>
      </div>

      {/* Kanan: Cart + Profile/Logout */}
      <div className="flex items-center gap-5">
        {/* Icon Keranjang (Biar tidak sepi) */}
        <Link
          href="/cart"
          className="relative p-2 rounded-full hover:bg-white/10 transition"
        >
          <ShoppingCartIcon className="w-6 h-6" />
          {/* Contoh notifikasi jumlah barang di keranjang */}
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            0
          </span>
        </Link>

        {/* Logika Asli Anda untuk Tampilan User */}
        {user ? (
          <>
            {/* Area Profil (Bisa diklik) */}
            <Link
              href="/profile/edit"
              className="flex items-center gap-3 p-1 rounded-lg hover:bg-white/10 transition"
            >
              <span className="font-medium hidden md:block">
                Hi, {user.name}
              </span>
              <img
                // Gunakan user.image jika ada, jika tidak, pakai UI Avatars
                src={
                  user.image || `https://ui-avatars.com/api/?name=${user.name}`
                }
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </Link>

            {/* Tombol Logout (Styling disesuaikan) */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition"
            >
              Logout
            </button>
          </>
        ) : (
          // Tombol Login (Styling disesuaikan)
          <Link
            href="/login"
            className="px-4 py-2 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-100 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
