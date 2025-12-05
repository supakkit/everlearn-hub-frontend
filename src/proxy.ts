import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { navigation } from "./data/navigation";

export function proxy(req: NextRequest) {
  // refreshToken must exist if user is logged in
  const accessToken = req.cookies.get("accessToken")?.value;
  const protectedRoutes = [
    navigation.admin.href,
    navigation.checkout.href,
    navigation.dashboard.href,
    navigation.learn.href,
    navigation.profile.href,
  ];

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL(navigation.login.href, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/checkout/:path*",
    "/dashboard/:path*",
    "/learn/:path*",
    "/profile/:path*",
  ],
};
