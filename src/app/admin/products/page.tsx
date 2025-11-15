"use client";

import { useState, useEffect, FormEvent } from "react";
import Navbar from "@/components/Navbar";

// Kita tentukan tipe data untuk Produk
// Ini harus cocok dengan schema.prisma Anda
interface Product {
  id: number;
  name: string;
  price: number;
  description: string | null;
  image: string | null;
  createdAt: string; // Tipe DateTime dari Prisma akan menjadi string
}

export default function AdminProductsPage() {
  // === STATE UNTUK FORM (CREATE) ===
  const [name, setName] = useState("");
  const [price, setPrice] = useState(""); // Kita pakai string dulu agar formnya mudah
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // === STATE UNTUK DAFTAR PRODUK (READ) ===
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // --- 1. MENGAMBIL DATA PRODUK (GET) ---
  const fetchProducts = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/products"); // Panggil API GET kita
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
      } else {
        alert("Gagal mengambil data produk.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengambil produk.");
    } finally {
      setLoadingData(false);
    }
  };

  // Kita panggil fetchProducts() saat halaman pertama kali dibuka
  useEffect(() => {
    fetchProducts();
  }, []); // [] artinya hanya jalan sekali saat load

  // --- 2. MENGIRIM PRODUK BARU (POST) ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      // Panggil API POST kita
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Penting untuk mengirim cookie (token)
        body: JSON.stringify({
          name: name,
          price: parseInt(price, 10), // Ubah string harga menjadi angka (integer)
          description: description,
          image: image,
        }),
      });

      setLoadingSubmit(false);
      const data = await res.json();

      if (!res.ok) {
        // Jika gagal (mungkin karena bukan ADMIN), tampilkan error
        alert(data.error || "Gagal membuat produk.");
      } else {
        // Jika berhasil:
        alert("Produk berhasil dibuat!");
        // Bersihkan form
        setName("");
        setPrice("");
        setDescription("");
        setImage("");
        // Muat ulang daftar produk agar yang baru muncul
        fetchProducts();
      }
    } catch (err) {
      setLoadingSubmit(false);
      console.error(err);
      alert("Terjadi kesalahan server.");
    }
  };

  // --- 3. TAMPILAN HALAMAN (UI) ---
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto p-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Admin Panel: Kelola Produk</h1>

        {/* Bagian 1: Form Create Product */}
        <div className="bg-white p-8 shadow-md rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tambah Produk Baru</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Nama Produk</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Mis: Sepatu Sneakers Pria"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Harga (Angka)</label>
              <input
                type="number" // Tipe 'number' agar hanya angka
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Mis: 150000 (tanpa Rp atau titik)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">URL Gambar</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Mis: /sepatu-baru.png (jika di 'public')"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Deskripsi</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Deskripsi singkat produk..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loadingSubmit}
              className={`w-full py-2 rounded-lg font-semibold text-white transition 
                ${
                  loadingSubmit
                    ? "bg-gray-400"
                    : "bg-green-500 hover:bg-green-600"
                }`}
            >
              {loadingSubmit ? "Menyimpan..." : "Tambah Produk"}
            </button>
          </form>
        </div>

        {/* Bagian 2: Daftar Produk */}
        <div className="bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Daftar Produk</h2>
          {loadingData ? (
            <p>Loading produk...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4">Nama Produk</th>
                    <th className="py-2 px-4">Harga</th>
                    <th className="py-2 px-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{product.name}</td>
                      <td className="py-2 px-4">
                        {/* Format harga jadi 'Rp 150.000' */}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(product.price)}
                      </td>
                      <td className="py-2 px-4 space-x-2">
                        <button className="text-blue-500 hover:underline">
                          Edit
                        </button>
                        <button className="text-red-500 hover:underline">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
