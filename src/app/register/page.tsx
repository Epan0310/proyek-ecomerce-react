"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function RegisterPage() {
  // --- LOGIKA ASLI ANDA (DENGAN PENAMBAHAN) ---

  // State asli Anda (saya ganti 'name' jadi 'fullName' agar lebih jelas)
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // --- PENAMBAHAN STATE BARU (sesuai desain) ---
  const [userId, setUserId] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  // --- Batas Penambahan State ---

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // --- PENAMBAHAN VALIDASI BARU ---
    if (!fullName || !userId || !email || !password || !confirmPassword) {
      alert("Semua field wajib diisi!");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      alert("Anda harus menyetujui syarat dan ketentuan!");
      setLoading(false);
      return;
    }
    // --- Batas Penambahan Validasi ---

    // Logika fetch Anda tetap sama, hanya body-nya disesuaikan
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Mengirim data baru (termasuk userId)
        body: JSON.stringify({ name: fullName, userId, email, password }),
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
  // --- BATAS AKHIR LOGIKA ---

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
            <span className="font-semibold text-lg text-green-500 border-b-2 border-green-500 pb-1">
              SIGN UP
            </span>
            <Link
              href="/login"
              className="font-semibold text-lg text-gray-400 pb-1 hover:text-green-500"
            >
              LOGIN
            </Link>
          </div>

          {/* Form Register */}
          <form className="space-y-5" onSubmit={handleRegister}>
            {/* FULL NAME */}
            <div>
              <label className="block font-medium text-gray-500 mb-1 text-sm">
                FULL NAME
              </label>
              <input
                type="text"
                className="w-full px-2 py-2 border-b-2 border-gray-300 focus:border-green-500 outline-none bg-transparent"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* USER ID */}
            <div>
              <label className="block font-medium text-gray-500 mb-1 text-sm">
                USER ID
              </label>
              <input
                type="text"
                className="w-full px-2 py-2 border-b-2 border-gray-300 focus:border-green-500 outline-none bg-transparent"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block font-medium text-gray-500 mb-1 text-sm">
                EMAIL
              </label>
              <input
                type="email"
                className="w-full px-2 py-2 border-b-2 border-gray-300 focus:border-green-500 outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password & Confirm Password (Split) */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block font-medium text-gray-500 mb-1 text-sm">
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="w-full px-2 py-2 border-b-2 border-gray-300 focus:border-green-500 outline-none bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium text-gray-500 mb-1 text-sm">
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  className="w-full px-2 py-2 border-b-2 border-gray-300 focus:border-green-500 outline-none bg-transparent"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Checkbox Terms */}
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I have accepted the{" "}
                <span className="font-semibold">terms and conditions</span>
              </label>
            </div>

            {/* Tombol Sign Up */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition mt-4
                ${
                  loading ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
                }`}
            >
              {loading ? "Loading..." : "SIGN UP"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
