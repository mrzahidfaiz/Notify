import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const verify = request.cookies.get("Authentication");
  if ((request.nextUrl.pathname === ("/" || "/admin/:path*")) && !verify) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  if (request.nextUrl.pathname === "/auth/signin" && verify) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (request.nextUrl.pathname === "/auth/signup" && verify) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
