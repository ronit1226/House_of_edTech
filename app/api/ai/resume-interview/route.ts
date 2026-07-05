import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api";
import { generateAiText } from "@/lib/ai/client";
import { resumeInterviewSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const input = resumeInterviewSchema.parse(await request.json());
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
