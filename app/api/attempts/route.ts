import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { apiError, handleApiError, requireSession } from "@/lib/api";
import { generateAiText } from "@/lib/ai/client";
import { getNextDifficulty, calculateMasteryScore } from "@/lib/adaptive-engine";
import { db } from "@/lib/db";
import { attempts, masteryScores } from "@/lib/db/schema";
import { correctnessToQuality, updateReviewSchedule } from "@/lib/spaced-repetition";
import { answerSchema } from "@/lib/validators";
import { getNextQuestion, getQuestion, publicQuestion, questionBank } from "@/lib/question-bank";

export async function POST(request: Request) {
  try {
    const session = await requireSession();

    if (session instanceof NextResponse) {
      return session;
    }

    const input = answerSchema.parse(await request.json());
    const question = getQuestion(input.questionId);

    if (!question) {
      return apiError("Question not found", "QUESTION_NOT_FOUND", 404);
    }

    const isCorrect = input.submittedAnswer.trim() === question.correctAnswer;
    const explanation = isCorrect
      ? null
      : await generateAiText(
          `Explain this misconception in 2-3 sentences.
Question: ${question.content}
Correct answer: ${question.correctAnswer}
Student answer: ${input.submittedAnswer}
Topic: ${question.topic}
Base note: ${question.explanationSeed}`,
        );

    const [attempt] = await db
      .insert(attempts)
      .values({
        userId: session.userId,
        questionId: question.id,
        submittedAnswer: input.submittedAnswer,
        isCorrect,
        aiExplanation: explanation,
      })
      .returning();

    const topicAttempts = await db.query.attempts.findMany({
      where: eq(attempts.userId, session.userId),
    });
    const mastery = calculateMasteryScore(
      topicAttempts
        .map((attemptRow) => {
          const attemptedQuestion = questionBank.find((item) => item.id === attemptRow.questionId);
          return attemptedQuestion?.topicId === question.topicId
            ? { difficulty: attemptedQuestion.difficulty, isCorrect: attemptRow.isCorrect }
            : null;
        })
        .filter((item): item is { difficulty: number; isCorrect: boolean } => Boolean(item)),
    );
    const currentMastery = await db.query.masteryScores.findFirst({
      where: and(eq(masteryScores.userId, session.userId), eq(masteryScores.topicId, question.topicId)),
    });
    const schedule = updateReviewSchedule({
      easeFactor: Number(currentMastery?.easeFactor ?? 2.5),
      intervalDays: currentMastery?.intervalDays ?? 1,
      quality: correctnessToQuality(isCorrect, question.difficulty),
    });

    await db
      .insert(masteryScores)
      .values({
        userId: session.userId,
        topicId: question.topicId,
        score: String(mastery),
        easeFactor: String(schedule.easeFactor),
        intervalDays: schedule.intervalDays,
        lastReviewedAt: schedule.lastReviewedAt,
        nextReviewAt: schedule.nextReviewAt,
      })
      .onConflictDoUpdate({
        target: [masteryScores.userId, masteryScores.topicId],
        set: {
          score: String(mastery),
          easeFactor: String(schedule.easeFactor),
          intervalDays: schedule.intervalDays,
          lastReviewedAt: schedule.lastReviewedAt,
          nextReviewAt: schedule.nextReviewAt,
        },
      });

    const next = getNextQuestion(
      question.topicId,
      getNextDifficulty(question.difficulty, isCorrect).nextDifficulty,
      question.id,
    );

    return NextResponse.json({
      attemptId: attempt.id,
      isCorrect,
      aiExplanation: explanation,
      mastery,
      nextQuestion: next ? publicQuestion(next) : null,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
