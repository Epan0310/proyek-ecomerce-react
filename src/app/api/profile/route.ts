import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { serialize } from "cookie";

// 1. Buat Tipe data yang jelas untuk token
interface TokenPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}

// --- FUNGSI GET (Mengambil data profil terbaru) ---
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 2. Gunakan Tipe TokenPayload
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

    if (!decoded.id) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Kode ini sudah SANGAT BAGUS.
    // Dia mengambil data TERBARU dari DB, bukan dari token.
    // Ini adalah cara yang aman.
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user: user }, { status: 200 });
  } catch (err) {
    // Jika token tidak valid (kadaluarsa, dll)
    return NextResponse.json({ user: null }, { status: 401 });
  }
}

// --- FUNGSI PUT (Memperbarui data profil) ---
export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Gunakan Tipe TokenPayload
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

    const userId = decoded.id;
    const body = await req.json();
    const { name, email, image } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nama dan Email wajib diisi" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        email: email,
        image: image,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    // --- 3. FIX BUG DURASI TOKEN ---
    // Samakan dengan login & register (1 hari)
    const newToken = jwt.sign(
      {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d", // <-- GANTI JADI '1d' (1 hari)
      }
    );

    const newCookie = serialize("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // <-- GANTI JADI 1 HARI (dalam detik)
      path: "/",
    });
    // --- Batas Modifikasi ---

    return NextResponse.json(
      {
        message: "Profil berhasil diperbarui",
        user: updatedUser,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": newCookie,
        },
      }
    );
  } catch (err: any) {
    console.error("PUT /api/profile error:", err);

    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      return NextResponse.json(
        { error: "Email ini sudah digunakan" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
