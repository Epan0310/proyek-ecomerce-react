import { NextResponse, NextRequest } from "next/server"; // <-- Ganti 'Request'
import { prisma } from "@/lib/prisma"; // <-- Gunakan prisma lib
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // <-- 1. IMPORT JWT

export async function POST(req: NextRequest) {
  // <-- Ganti 'Request'
  try {
    const body = await req.json();
    const { name, email, password } = body as {
      name: string;
      email: string;
      password: string;
    };

    // Validasi
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Cek user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // 'role' akan otomatis di-set ke "USER" oleh @default
      },
      // --- 2. MODIFIKASI SELECT ---
      // Kita perlu 'role' untuk membuat token
      select: {
        id: true,
        name: true,
        email: true,
        role: true, // <-- TAMBAHKAN INI
      },
    });

    // --- 3. TAMBAHKAN LOGIKA AUTO-LOGIN ---
    // Buat token (JWT payload)
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role, // <-- Ini akan berisi "USER"
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    // Buat respons
    const res = NextResponse.json(
      {
        message: "User berhasil dibuat",
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      },
      { status: 201 }
    );

    // Set cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return res;
    // --- Batas Modifikasi ---
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: "Server Error", detail: (err as Error).message },
      { status: 500 }
    );
  }
  // Kita tidak perlu $disconnect() jika pakai 'lib/prisma'
}
