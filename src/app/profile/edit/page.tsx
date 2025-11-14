"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  // State untuk data form
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>(""); // URL gambar profil

  // State untuk loading
  const [loadingData, setLoadingData] = useState<boolean>(true); // Loading saat ambil data
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false); // Loading saat submit

  const router = useRouter();

  // 1. Ambil data profil saat ini
  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingData(true);
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          alert("Gagal mengambil data profil. Silakan login ulang.");
          router.push("/login");
          return;
        }

        const data = await res.json();
        const user = data.user;

        // Isi state form dengan data yang didapat
        setName(user.name || "");
        setEmail(user.email || "");
        setImage(user.image || ""); // user.image dari database
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Terjadi kesalahan, coba lagi nanti.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchProfile();
  }, [router]); // dependency array ditambahkan 'router'

  // 2. Kirim data yang diperbarui
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT", // Kita gunakan PUT untuk update
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          image, // Kirim URL gambar baru
        }),
      });

      const data = await res.json();
      setLoadingSubmit(false);

      if (!res.ok) {
        alert(data.error || "Gagal memperbarui profil.");
        return;
      }

      alert("Profil berhasil diperbarui!");
      // Refresh halaman agar Navbar juga ikut ter-update
      router.push("/dashboard");
    } catch (err) {
      setLoadingSubmit(false);
      console.error("Error updating profile:", err);
      alert("Terjadi kesalahan server.");
    }
  };

  // Tampilan loading
  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading profile...</p>
      </div>
    );
  }

  // Tampilan Form
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 shadow-md rounded-lg"
      >
        {/* Preview Gambar */}
        <div className="flex flex-col items-center">
          <img
            // Jika 'image' ada (walau string kosong), pakai itu. Jika 'null' atau 'undefined', pakai ui-avatars
            src={image || `https://ui-avatars.com/api/?name=${name || "User"}`}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        {/* Input URL Gambar */}
        <div>
          <label className="block font-medium mb-1">Profile Picture URL</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="https://example.com/image.png"
            value={image} // 'image' bisa jadi string kosong
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {/* Input Nama */}
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Nama lengkap Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Input Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={loadingSubmit}
          className={`w-full py-2 rounded-lg font-semibold text-white transition 
            ${
              loadingSubmit ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
        >
          {loadingSubmit ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
