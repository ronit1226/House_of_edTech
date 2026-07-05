import { NextResponse } from "next/server";
import { requireSession } from "@/lib/api";
import { generateAiText } from "@/lib/ai/client";
import { db } from "@/lib/db";
import { mockInterviews } from "@/lib/db/schema";

export async function POST() {
  const session = await requireSession();

  if (session instanceof NextResponse) {
    return session;
  }

  const opener = await generateAiText(
    `You are a strict but helpful CS/IT placement interviewer.
Ask exactly one concise technical interview question.
Use one of these areas: arrays, dynamic programming, graphs, SQL, operating systems, networking, or system design.
Do not answer the question. Do not add extra explanation.`,
  );
  const transcript = [{ role: "assistant", content: opener, timestamp: new Date().toISOString() }];
  const [interview] = await db
    .insert(mockInterviews)
    .values({ userId: session.userId, transcriptJson: transcript })
    .returning();

  return NextResponse.json({ interviewId: interview.id, transcript });
}
