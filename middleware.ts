import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";

  // No token → redirect ke login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verify token
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Proteksi halaman admin
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (decoded.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/403", req.url));
      }
    }

    // Jika semua aman → lanjut
    return NextResponse.next();
  } catch (err) {
    // token rusak / expired → hapus cookie + redirect login
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("token", "", { path: "/", maxAge: 0 });
    return response;
  }
}

// Halaman yang dilindungi middleware
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*"],
};
