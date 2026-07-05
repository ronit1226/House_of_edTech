import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api";
import { generateAiText } from "@/lib/ai/client";
import { studyPlanSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const input = studyPlanSchema.parse(await request.json());
    const result = await generateAiText(
      `Create a personalized CS/IT placement study plan.
Weak topics: ${input.weakTopics.join(", ")}
Daily study hours: ${input.dailyHours}
Target company: ${input.targetCompany ?? "general placement"}
Interview date: ${input.interviewDate ?? "not provided"}

Return exactly:
1. Today's Plan with time blocks
2. 7-Day Plan
3. Topic Priority Order
4. Practice Mix: DSA, CS fundamentals, projects, HR
5. Mock Interview Schedule
6. Final revision checklist`,
    );

    return NextResponse.json({ result });
  } catch (error) {
    return handleApiError(error);
  }
}
