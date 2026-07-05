import { eq } from "drizzle-orm";
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

  const rows = await db.query.masteryScores.findMany({
    where: eq(masteryScores.userId, session.userId),
  });
  const mastery = topicBank.map((topic) => {
    const row = rows.find((item) => item.topicId === topic.id);

    return {
      topicId: topic.id,
      topic: topic.name,
      category: topic.category,
      score: Number(row?.score ?? 0),
      nextReviewAt: row?.nextReviewAt,
    };
  });

  return NextResponse.json({
    mastery,
    readinessScore: Math.round(
      mastery.reduce((total, topic) => total + topic.score, 0) / Math.max(1, mastery.length),
    ),
  });
}
