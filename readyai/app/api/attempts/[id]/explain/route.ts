import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { apiError, requireSession } from "@/lib/api";
import { db } from "@/lib/db";
import { attempts } from "@/lib/db/schema";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await requireSession();

  if (session instanceof NextResponse) {
    return session;
  }

  const { id } = await context.params;
  const attempt = await db.query.attempts.findFirst({
    where: and(eq(attempts.id, id), eq(attempts.userId, session.userId)),
  });

  if (!attempt) {
    return apiError("Attempt not found", "ATTEMPT_NOT_FOUND", 404);
  }

  return NextResponse.json({ aiExplanation: attempt.aiExplanation });
}
