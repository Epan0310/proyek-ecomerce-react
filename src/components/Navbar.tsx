"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserProfile = {
  id: number;
  name: string;
  email: string;
} | null;

export default function Navbar() {
  const [user, setUser] = useState<UserProfile>(null);
  const router = useRouter();

  // Ambil data user dari API
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

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      // Optional: bersihin state biar langsung hilang dari navbar
      setUser(null);

      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Kiri */}
      <Link href="/dashboard" className="text-xl font-bold text-blue-600">
        MyShop
      </Link>

      {/* Kanan */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="font-medium">Hi, {user.name}</span>

            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt="Profile"
              className="w-10 h-10 rounded-full border"
            />

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
