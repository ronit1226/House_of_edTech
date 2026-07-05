import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { apiError, handleApiError, requireSession } from "@/lib/api";
import { generateAiText } from "@/lib/ai/client";
import { db } from "@/lib/db";
import { mockInterviews } from "@/lib/db/schema";
import { mockRespondSchema } from "@/lib/validators";

type TranscriptMessage = {
  role: "assistant" | "student";
  content: string;
  timestamp: string;
};

export async function POST(request: Request) {
  try {
    const session = await requireSession();

    if (session instanceof NextResponse) {
      return session;
    }

    const input = mockRespondSchema.parse(await request.json());
    const interview = await db.query.mockInterviews.findFirst({
      where: and(eq(mockInterviews.id, input.interviewId), eq(mockInterviews.userId, session.userId)),
    });

    if (!interview) {
      return apiError("Interview not found", "INTERVIEW_NOT_FOUND", 404);
    }

    const transcript = interview.transcriptJson as TranscriptMessage[];
    const turns = transcript.filter((item) => item.role === "student").length;
    const feedback = await generateAiText(
      `Evaluate this CS/IT interview answer.
Return exactly:
Score: X/10
Feedback: 2 concise sentences mentioning correctness, clarity, and what to improve.
Question: ${transcript.at(-1)?.content}
Answer: ${input.response}`,
    );
    const nextQuestion =
      turns >= 4
        ? null
        : await generateAiText(
            `Ask exactly one next CS/IT placement interview question.
Prefer a different topic from the previous question.
Do not include answer, hint, or feedback.`,
          );
    const updatedTranscript: TranscriptMessage[] = [
      ...transcript,
      { role: "student", content: input.response, timestamp: new Date().toISOString() },
      {
        role: "assistant",
        content: nextQuestion ? `${feedback}\n\n${nextQuestion}` : feedback,
        timestamp: new Date().toISOString(),
      },
    ];

    await db
      .update(mockInterviews)
      .set({
        transcriptJson: updatedTranscript,
        aiFeedback: feedback,
        aiScore: turns >= 4 ? "78" : null,
      })
      .where(and(eq(mockInterviews.id, input.interviewId), eq(mockInterviews.userId, session.userId)));

    return NextResponse.json({
      transcript: updatedTranscript,
      finished: !nextQuestion,
      feedback,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
