import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { apiError, requireSession } from "@/lib/api";
import { db } from "@/lib/db";
import { mockInterviews } from "@/lib/db/schema";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await requireSession();

  if (session instanceof NextResponse) {
    return session;
  }

  const { id } = await context.params;
  const interview = await db.query.mockInterviews.findFirst({
    where: and(eq(mockInterviews.id, id), eq(mockInterviews.userId, session.userId)),
  });

  if (!interview) {
    return apiError("Interview not found", "INTERVIEW_NOT_FOUND", 404);
  }

  return NextResponse.json({
    transcript: interview.transcriptJson,
    aiFeedback: interview.aiFeedback,
    aiScore: interview.aiScore,
  });
}
