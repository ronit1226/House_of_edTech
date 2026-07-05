import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isApi = request.nextUrl.pathname.startsWith("/api/");
  const isAuth = request.nextUrl.pathname.startsWith("/api/auth/");

  if (!isApi || isAuth) {
    return NextResponse.next();
  }

  if (!request.cookies.get("readyai_access")) {
    return NextResponse.json(
      { error: "Authentication required", code: "UNAUTHORIZED" },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
