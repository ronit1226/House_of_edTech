export type DifficultyResult = {
  nextDifficulty: number;
  weakTopic: boolean;
};

export type WeightedAttempt = {
  difficulty: number;
  isCorrect: boolean;
};

export function getNextDifficulty(currentDifficulty: number, isCorrect: boolean): DifficultyResult {
  const nextDifficulty = isCorrect
    ? Math.min(currentDifficulty + 1, 5)
    : Math.max(currentDifficulty - 1, 1);

  return {
    nextDifficulty,
    weakTopic: !isCorrect,
  };
}

export function calculateMasteryScore(attempts: WeightedAttempt[]): number {
  const totalWeight = attempts.reduce((total, attempt) => total + attempt.difficulty, 0);

  if (totalWeight === 0) {
    return 0;
  }

  const correctWeight = attempts.reduce(
    (total, attempt) => total + (attempt.isCorrect ? attempt.difficulty : 0),
    0,
  );

  return Math.round((correctWeight / totalWeight) * 100);
}
