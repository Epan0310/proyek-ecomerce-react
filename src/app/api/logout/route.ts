import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 1. Buat respons JSON
    const res = NextResponse.json({ message: "Logout berhasil" });

    // 2. Gunakan helper .cookies.set() untuk menghapus cookie
    // Ini cara Next.js untuk melakukan hal yang sama dengan string Anda
    res.cookies.set("token", "", {
      // <-- Set nilai jadi kosong
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Otomatis
      sameSite: "strict", // Anda pakai 'strict', itu bagus
      path: "/",
      maxAge: 0, // <-- Set maxAge ke 0 (atau -1) untuk menghapus
    });

    return res;
  } catch (err) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
