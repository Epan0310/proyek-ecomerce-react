"use client";
import { useState } from "react";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-5" onSubmit={handleLogin}>
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
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
