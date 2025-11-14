"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password) {
      alert("Semua field wajib diisi!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.error || "Gagal register!");
        return;
      }

      alert("Berhasil register! Silakan login.");
      window.location.href = "/login";
    } catch (error) {
      setLoading(false);
      alert("Terjadi kesalahan server!");
      console.error("Register error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-xl focus:ring focus:ring-blue-300"
              placeholder="Nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-xl focus:ring focus:ring-blue-300"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-xl focus:ring focus:ring-blue-300"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl font-semibold text-white transition
            ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
