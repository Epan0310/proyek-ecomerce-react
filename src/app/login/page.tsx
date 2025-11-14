"use client";
import { useState } from "react";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  // --- LOGIKA ANDA (TIDAK BERUBAH SAMA SEKALI) ---
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      alert("Email dan password wajib diisi!");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data: any = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Login gagal!");
      return;
    }

    alert("Login berhasil!");
    window.location.href = "/dashboard";
  };
  // --- BATAS AKHIR LOGIKA ANDA ---

  // --- TAMPILAN JSX (DIMODIFIKASI) ---
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Kolom Kiri (Branding) */}
      <div className="w-1/2 bg-gradient-to-br from-green-400 to-blue-600 text-white p-12 flex flex-col justify-center">
        <h1 className="text-5xl font-bold mb-4">LOGO</h1>
        <p className="text-lg leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
      </div>

      {/* Kolom Kanan (Form) */}
      <div className="w-1/2 bg-white p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Navigasi Sign Up / Login */}
          <div className="flex justify-end space-x-4 mb-8">
            <Link
              href="/register"
              className="font-semibold text-lg text-gray-400 pb-1 hover:text-green-500"
            >
              SIGN UP
            </Link>
            <span className="font-semibold text-lg text-green-500 border-b-2 border-green-500 pb-1">
              LOGIN
            </span>
          </div>

          {/* Form Login Anda diletakkan di sini.
            Kita ubah styling input dan button agar mirip desain baru.
          */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block font-medium text-gray-500 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-2 py-2 border-b-2 border-gray-300 focus:border-green-500 outline-none bg-transparent"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-500 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-2 py-2 border-b-2 border-gray-300 focus:border-green-500 outline-none bg-transparent"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Tombol dimodifikasi agar sesuai warna desain baru */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition mt-4
                ${
                  loading ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
                }`}
            >
              {loading ? "Loading..." : "LOGIN"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Belum punya akun?{" "}
            <Link href="/register" className="text-green-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
