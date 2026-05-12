import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLogin =
    req.nextUrl.pathname === "/dashboard/login" ||
    req.nextUrl.pathname === "/dashboard/login/";
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (!isDashboard) return NextResponse.next();
  if (isLogin) return NextResponse.next();
  if (!req.auth?.user?.email)
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
