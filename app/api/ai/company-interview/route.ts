import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api";
import { generateAiText } from "@/lib/ai/client";
import { companyInterviewSchema } from "@/lib/validators";

const companyFocus: Record<string, string> = {
  Google: "hard DSA, algorithms, complexity analysis, and scalable system design",
  Amazon: "DSA, behavioral leadership principles, projects, and scalable design",
  Microsoft: "DSA, OOP, system design basics, debugging, and project depth",
  TCS: "OOPS, DBMS, OS, CN, easy coding, aptitude-style fundamentals",
  Infosys: "SQL, OOPS, DBMS, HR, and basic coding",
  Accenture: "JavaScript, DBMS, cloud basics, communication, and scenario questions",
  Capgemini: "OOPS, SQL, OS, networking, and practical project questions",
  Cognizant: "programming basics, DBMS, web fundamentals, and HR communication",
};

export async function POST(request: Request) {
  try {
    const input = companyInterviewSchema.parse(await request.json());
    const result = await generateAiText(
      `Create a ${input.level} difficulty interview set for ${input.company}.
Company focus: ${companyFocus[input.company]}.

Return exactly:
1. Interview Pattern
2. Technical Questions: 8
3. Coding Questions: 3
4. HR/Behavioral Questions: 4
5. Preparation Advice: 5 bullets`,
    );

    return NextResponse.json({ result });
  } catch (error) {
    return handleApiError(error);
  }
}
