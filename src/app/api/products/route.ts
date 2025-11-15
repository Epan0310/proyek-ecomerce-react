import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

// Tipe untuk payload token
interface TokenPayload {
  id: number;
  role: string;
}

// ===================================================================
// FUNGSI POST (CREATE PRODUCT) --- HANYA UNTUK ADMIN
// ===================================================================
export async function POST(req: NextRequest) {
  try {
    // 1. Ambil token
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Verifikasi token & role
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

    // 3. INI DIA PENJAGANYA!
    if (decoded.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Akses ditolak. Hanya untuk Admin." },
        { status: 403 } // 403 = Forbidden (Dilarang)
      );
    }

    // 4. Jika lolos (dia adalah ADMIN), lanjutkan:
    const { name, price, description, image } = await req.json();

    if (!name || !price) {
      return NextResponse.json(
        { error: "Nama dan Harga produk wajib diisi" },
        { status: 400 }
      );
    }

    // 5. Buat produk di database
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: price, // Pastikan ini adalah angka (integer)
        description: description,
        image: image,
      },
    });

    return NextResponse.json(
      { message: "Produk berhasil dibuat", product: newProduct },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// ===================================================================
// FUNGSI GET (READ ALL PRODUCTS) --- UNTUK SEMUA ORANG
// ===================================================================
export async function GET(req: NextRequest) {
  try {
    // Tidak perlu cek token, semua orang boleh lihat produk

    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc", // Tampilkan yang terbaru dulu
      },
    });

    return NextResponse.json({ products: products }, { status: 200 });
  } catch (err: any) {
    console.error("GET /api/products error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
