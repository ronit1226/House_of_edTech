import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { apiError, handleApiError } from "@/lib/api";
import { authCookies, hashPassword, signToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { signupSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const input = signupSchema.parse(await request.json());
    const existing = await db.query.users.findFirst({ where: eq(users.email, input.email) });

    if (existing) {
      return apiError("Email is already registered", "EMAIL_EXISTS", 409);
    }

    const [user] = await db
      .insert(users)
      .values({
        name: input.name,
        email: input.email.toLowerCase(),
        passwordHash: await hashPassword(input.password),
      })
      .returning();
    const session = { userId: user.id, email: user.email, role: user.role as "student" | "mentor" };
    const response = NextResponse.json({ user: session }, { status: 201 });
    authCookies(await signToken(session), await signToken(session, "7d")).forEach((cookie) =>
      response.headers.append("Set-Cookie", cookie),
    );

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
