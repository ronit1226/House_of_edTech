import { createRequire } from "node:module";
import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api";
import { generateAiText } from "@/lib/ai/client";
import { resumeInterviewSchema } from "@/lib/validators";

export const runtime = "nodejs";

const require = createRequire(import.meta.url);
const parsePdf = require("pdf-parse/lib/pdf-parse") as (data: Buffer) => Promise<{ text: string }>;

async function getResumeInput(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("resumeFile");
    const targetCompany = String(formData.get("targetCompany") ?? "").trim() || undefined;

    if (!(file instanceof File)) {
      return resumeInterviewSchema.parse({
        resumeText: String(formData.get("resumeText") ?? ""),
        targetCompany,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let resumeText = buffer.toString("utf8");

    if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      const result = await parsePdf(buffer);
      resumeText = result.text;
    }

    return resumeInterviewSchema.parse({ resumeText: resumeText.trim(), targetCompany });
  }

  return resumeInterviewSchema.parse(await request.json());
}

export async function POST(request: Request) {
  try {
    const input = await getResumeInput(request);

    if (!input.resumeText || input.resumeText.trim().length < 80) {
      return NextResponse.json(
        { error: "Add at least 80 characters of resume text or upload a resume file before generating." },
        { status: 400 },
      );
    }

    const result = await generateAiText(
      `You are an expert campus placement interviewer.
Read this resume text and create a resume-based interview.
Target company: ${input.targetCompany ?? "general CS/IT placement"}.

Return exactly these sections:
1. Extracted Skills: comma-separated
2. Extracted Projects: bullet list
3. Interview Questions: 8 questions, each tied to a resume skill/project/experience
4. Evaluation Rubric: what a strong answer should contain

Resume:
${input.resumeText}`,
    );

    return NextResponse.json({ result });
  } catch (error) {
    return handleApiError(error);
  }
}
