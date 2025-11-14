import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");

    if (!cookieHeader) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Cari cookie "token"
    const cookies = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .reduce((acc: Record<string, string>, curr) => {
        const [key, value] = curr.split("=");
        acc[key] = value;
        return acc;
      }, {});

    const token = cookies["token"];

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
      name: string;
      role?: string;
    };

    return NextResponse.json(
      {
        user: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role ?? undefined, // hanya jika ada
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
