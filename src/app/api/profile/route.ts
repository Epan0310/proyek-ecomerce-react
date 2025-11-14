import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { serialize } from "cookie";

// --- FUNGSI GET (Mengambil data profil terbaru) ---
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    if (!decoded.id) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

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
    // 1. Autentikasi: Dapatkan ID user dari token
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    const userId = decoded.id;

    // 2. Ambil data dari body request
    const body = await req.json();
    const { name, email, image } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nama dan Email wajib diisi" },
        { status: 400 }
      );
    }

    // 3. Update database menggunakan Prisma + 'select'
    //    Perhatikan: 'prisma.user.update', BUKAN 'findUnique'
    const updatedUser = await prisma.user.update({
      where: {
        id: userId, // Update user berdasarkan ID dari token
      },
      data: {
        name: name,
        email: email,
        image: image, // Simpan URL gambar baru
      },
      // 'select' ini penting untuk keamanan (tidak membocorkan password)
      // dan untuk konsistensi tipe data
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    // 4. Buat TOKEN BARU dengan data yang sudah di-update
    const newToken = jwt.sign(
      {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h", // Sesuaikan dengan durasi login Anda
      }
    );

    // 5. Siapkan cookie baru untuk dikirim ke browser
    const newCookie = serialize("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 jam
      path: "/",
    });

    // 6. Kirim respons sukses DENGAN cookie baru
    return NextResponse.json(
      {
        message: "Profil berhasil diperbarui",
        user: updatedUser, // Mengirim data user yang baru (dan aman)
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

    // Handle error jika email sudah terpakai oleh user lain
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
