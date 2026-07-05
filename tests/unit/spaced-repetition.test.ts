import { describe, expect, it } from "vitest";
import { correctnessToQuality, updateReviewSchedule } from "@/lib/spaced-repetition";

describe("spaced repetition", () => {
  it("resets interval after low quality review", () => {
    const schedule = updateReviewSchedule({
      easeFactor: 2.5,
      intervalDays: 6,
      quality: 2,
      reviewedAt: new Date("2026-01-01T00:00:00.000Z"),
    });

    expect(schedule.intervalDays).toBe(1);
    expect(schedule.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("extends interval after successful review", () => {
    const schedule = updateReviewSchedule({
      easeFactor: 2.5,
      intervalDays: 2,
      quality: 5,
      reviewedAt: new Date("2026-01-01T00:00:00.000Z"),
    });

    expect(schedule.intervalDays).toBe(5);
    expect(schedule.nextReviewAt.toISOString()).toBe("2026-01-06T00:00:00.000Z");
  });

  it("maps correctness into bounded quality", () => {
    expect(correctnessToQuality(false, 5)).toBe(2);
    expect(correctnessToQuality(true, 1)).toBe(3);
    expect(correctnessToQuality(true, 5)).toBe(5);
  });
});
