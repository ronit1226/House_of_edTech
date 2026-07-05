import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { authCookies, signToken, verifyToken } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("readyai_refresh")?.value;

  if (!refreshToken) {
    return apiError("Refresh token required", "UNAUTHORIZED", 401);
  }

  try {
    const session = await verifyToken(refreshToken);
    const response = NextResponse.json({ user: session });
    authCookies(await signToken(session), await signToken(session, "7d")).forEach((cookie) =>
      response.headers.append("Set-Cookie", cookie),
    );

    return response;
  } catch {
    return apiError("Invalid refresh token", "UNAUTHORIZED", 401);
  }
}
