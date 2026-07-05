export type ReviewInput = {
  easeFactor: number;
  intervalDays: number;
  quality: number;
  reviewedAt?: Date;
};

export type ReviewSchedule = {
  easeFactor: number;
  intervalDays: number;
  lastReviewedAt: Date;
  nextReviewAt: Date;
};

export function correctnessToQuality(isCorrect: boolean, difficulty: number): number {
  if (!isCorrect) {
    return 2;
  }

  return Math.min(5, Math.max(3, difficulty));
}

export function updateReviewSchedule(input: ReviewInput): ReviewSchedule {
  const reviewedAt = input.reviewedAt ?? new Date();
  const quality = Math.min(5, Math.max(0, input.quality));
  const nextEaseFactor = Math.max(
    1.3,
    input.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
  );
  const intervalDays =
    quality >= 3 ? Math.max(1, Math.round(input.intervalDays * nextEaseFactor)) : 1;
  const nextReviewAt = new Date(reviewedAt);
  nextReviewAt.setDate(nextReviewAt.getDate() + intervalDays);

  return {
    easeFactor: Number(nextEaseFactor.toFixed(2)),
    intervalDays,
    lastReviewedAt: reviewedAt,
    nextReviewAt,
  };
}
