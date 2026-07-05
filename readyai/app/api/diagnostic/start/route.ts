import { NextResponse } from "next/server";
import { requireSession } from "@/lib/api";
import { getDiagnosticQuestions, publicQuestion } from "@/lib/question-bank";

export async function POST() {
  const session = await requireSession();

  if (session instanceof NextResponse) {
    return session;
  }

  return NextResponse.json({
    questions: getDiagnosticQuestions().map(publicQuestion),
  });
}
