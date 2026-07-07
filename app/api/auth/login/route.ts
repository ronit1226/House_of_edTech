import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { apiError, handleApiError } from "@/lib/api";
import { authCookies, signToken, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { loginSchema } from "@/lib/validators";

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(email: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(email);

  if (!attempt || attempt.resetAt < now) {
    loginAttempts.set(email, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  attempt.count += 1;
  return attempt.count > 5;
}

export async function POST(request: Request) {
  try {
    const input = loginSchema.parse(await request.json());

    if (isRateLimited(input.email)) {
      return apiError("Too many login attempts", "RATE_LIMITED", 429);
    }

    const user = await db.query.users.findFirst({ where: eq(users.email, input.email.toLowerCase()) });

    if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
      return apiError("Invalid email or password", "INVALID_CREDENTIALS", 401);
    }

    const session = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role as "student" | "mentor",
    };
    const response = NextResponse.json({ user: session });
    authCookies(await signToken(session), await signToken(session, "7d")).forEach((cookie) =>
      response.headers.append("Set-Cookie", cookie),
    );

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
