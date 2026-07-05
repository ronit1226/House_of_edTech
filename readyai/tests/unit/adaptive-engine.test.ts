import { describe, expect, it } from "vitest";
import { calculateMasteryScore, getNextDifficulty } from "@/lib/adaptive-engine";

describe("adaptive engine", () => {
  it("raises difficulty after correct answers with a cap", () => {
    expect(getNextDifficulty(3, true)).toEqual({ nextDifficulty: 4, weakTopic: false });
    expect(getNextDifficulty(5, true).nextDifficulty).toBe(5);
  });

  it("lowers difficulty after wrong answers with a floor", () => {
    expect(getNextDifficulty(3, false)).toEqual({ nextDifficulty: 2, weakTopic: true });
    expect(getNextDifficulty(1, false).nextDifficulty).toBe(1);
  });

  it("weights mastery by difficulty", () => {
    expect(
      calculateMasteryScore([
        { difficulty: 1, isCorrect: true },
        { difficulty: 5, isCorrect: false },
        { difficulty: 4, isCorrect: true },
      ]),
    ).toBe(50);
  });
});
