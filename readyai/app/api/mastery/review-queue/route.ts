import { and, eq, lte } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireSession } from "@/lib/api";
import { db } from "@/lib/db";
import { masteryScores } from "@/lib/db/schema";
import { topicBank } from "@/lib/question-bank";

export async function GET() {
  const session = await requireSession();

  if (session instanceof NextResponse) {
    return session;
  }

  const due = await db.query.masteryScores.findMany({
    where: and(eq(masteryScores.userId, session.userId), lte(masteryScores.nextReviewAt, new Date())),
  });

  return NextResponse.json({
    due: due.map((row) => {
      const topic = topicBank.find((item) => item.id === row.topicId);

      return {
        topicId: row.topicId,
        topic: topic?.name ?? "Unknown topic",
        score: Number(row.score ?? 0),
        nextReviewAt: row.nextReviewAt,
      };
    }),
  });
}
