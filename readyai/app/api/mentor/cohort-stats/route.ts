import { avg, count } from "drizzle-orm";
import { NextResponse } from "next/server";
import { apiError, requireSession } from "@/lib/api";
import { db } from "@/lib/db";
import { masteryScores } from "@/lib/db/schema";

export async function GET() {
  const session = await requireSession();

  if (session instanceof NextResponse) {
    return session;
  }

  if (session.role !== "mentor") {
    return apiError("Mentor role required", "FORBIDDEN", 403);
  }

  const [stats] = await db
    .select({
      studentsRepresented: count(masteryScores.userId),
      averageMastery: avg(masteryScores.score),
    })
    .from(masteryScores);

  return NextResponse.json({ stats });
}
