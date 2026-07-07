import { describe, expect, it } from "vitest";
import { canGenerateResumeInterview } from "../../lib/resume-interview";

describe("canGenerateResumeInterview", () => {
  it("allows generation when a resume file is uploaded even if no text is pasted", () => {
    const file = new File(["resume content"], "resume.pdf", { type: "application/pdf" });

    expect(canGenerateResumeInterview({ resumeText: "", resumeFile: file })).toBe(true);
  });

  it("requires at least 80 characters of text when no file is uploaded", () => {
    expect(canGenerateResumeInterview({ resumeText: "short text", resumeFile: null })).toBe(false);
  });
});
