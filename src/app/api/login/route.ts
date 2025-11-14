import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
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

    // JWT payload (role optional kalau memang tidak ada)
    const payload: any = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    if ((user as any).role) {
      payload.role = (user as any).role;
    }

    // Buat token
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

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
