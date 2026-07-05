import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getSession, type SessionUser } from "./auth";

export function apiError(error: string, code = "BAD_REQUEST", status = 400) {
  return NextResponse.json({ error, code }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return apiError("Invalid request input", "VALIDATION_ERROR", 422);
  }

  return apiError("Something went wrong", "INTERNAL_ERROR", 500);
}

export async function requireSession(): Promise<SessionUser | NextResponse> {
  const session = await getSession();

  if (!session) {
    return apiError("Authentication required", "UNAUTHORIZED", 401);
  }

  return session;
}
