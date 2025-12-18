// src/middleware.ts
import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export default auth((req : any) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // 1. Jika user mencoba akses halaman Admin tapi belum login
  if (pathname.startsWith("/admin") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. Jika user sudah login tapi mencoba akses halaman Login
  if (pathname.startsWith("/login") && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

// Tentukan route mana saja yang akan dicek oleh middleware
export const config = {
  matcher: ["/admin/:path*", "/login"],
};