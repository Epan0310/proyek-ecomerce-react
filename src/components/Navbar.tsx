"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

type UserProfile = {
  id: number;
  name: string;
  email: string;
  image?: string | null;
  role: string;
} | null;

export default function Navbar() {
  const [user, setUser] = useState<UserProfile>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // --- PERUBAHAN 1: PAKSA CACHE-BUST ---
        // Menambahkan parameter acak (timestamp)
        const res = await fetch(`/api/profile?t=${new Date().getTime()}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store", // Biarkan ini tetap ada
        });
        // --- BATAS PERUBAHAN 1 ---

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

      // --- PERUBAHAN 2: PAKSA RELOAD ---
      // Mengganti router.push() dengan ini agar state React hancur total
      window.location.href = "/login";
      // --- BATAS PERUBAHAN 2 ---
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="w-full bg-gradient-to-br from-green-400 to-blue-600 text-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Kiri: Logo + Nav Links */}
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-xl font-bold text-white">
          MyShop
        </Link>

        {/* Nav Links */}
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

          {/* Pengecekan role (sudah benar) */}
          {user && user.role === "ADMIN" && (
            <Link
              href="/admin/products"
              className="font-bold text-yellow-300 hover:text-yellow-400 transition"
            >
              Admin Panel
            </Link>
          )}
        </div>
      </div>

      {/* Kanan: Cart + Profile/Logout */}
      <div className="flex items-center gap-5">
        <Link
          href="/cart"
          className="relative p-2 rounded-full hover:bg-white/10 transition"
        >
          <ShoppingCartIcon className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            0
          </span>
        </Link>

        {user ? (
          <>
            <Link
              href="/profile/edit"
              className="flex items-center gap-3 p-1 rounded-lg hover:bg-white/10 transition"
            >
              <span className="font-medium hidden md:block">
                Hi, {user.name}
              </span>
              <img
                src={
                  user.image || `https://ui-avatars.com/api/?name=${user.name}`
                }
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition"
            >
              Logout
            </button>
          </>
        ) : (
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
