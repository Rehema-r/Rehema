import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export default auth((request) => {
  const isLogin = request.nextUrl.pathname === "/admin/login";
  if (!isLogin && !request.auth) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  if (isLogin && request.auth) return NextResponse.redirect(new URL("/admin", request.url));
  return NextResponse.next();
});

export const config = { matcher: ["/admin/:path*"] };
