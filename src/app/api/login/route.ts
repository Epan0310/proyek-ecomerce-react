import { NextResponse, NextRequest } from "next/server"; // <-- Ganti 'Request' jadi 'NextRequest'
import { prisma } from "@/lib/prisma"; // <-- 1. GANTI IMPORT PRISMA
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  // <-- Ganti juga di sini
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Cek user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email tidak ditemukan" },
        { status: 404 }
      );
    }

    // Cek password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    // --- 2. INI MODIFIKASI ANDA ---
    // Buat token
    // Kita bisa langsung masukkan 'role' karena skema kita menjaminnya
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role, // <-- Langsung tambahkan di sini
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );
    // --- Batas Modifikasi ---

    const res = NextResponse.json(
      { message: "Login berhasil" },
      { status: 200 }
    );

    // Set cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server", detail: error.message },
      { status: 500 }
    );
  }
}
