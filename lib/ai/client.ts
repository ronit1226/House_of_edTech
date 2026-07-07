import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

function fallbackFromPrompt(prompt: string) {
  if (prompt.toLowerCase().includes("study plan")) {
    return `1. Today's Plan
9:00 AM - Graphs practice, 45 min
10:00 AM - Operating System revision, 30 min
11:00 AM - SQL queries, 30 min
12:00 PM - Mock interview, 20 min
2. 7-Day Plan
Day 1: DSA arrays and strings
Day 2: DBMS keys, joins, normalization
Day 3: OS process, threads, deadlock
Day 4: CN TCP, UDP, DNS, HTTP
Day 5: OOPS pillars and coding
Day 6: Resume/project interview
Day 7: Full mock test and revision
3. Topic Priority Order: weakest topics first, then company-specific topics.
4. Practice Mix: 40% DSA, 30% core CS, 20% project, 10% HR.
5. Mock Interview Schedule: one short mock every alternate day.
6. Final revision checklist: resume, SQL, OOPS, OS, CN, top coding patterns.`;
  }

  if (prompt.toLowerCase().includes("resume")) {
    return `1. Extracted Skills: React, Node.js, Express, MongoDB, SQL, Authentication
2. Extracted Projects:
- AI Resume Builder
- Banking Management System
3. Interview Questions:
1. Tell me about your strongest project and your exact contribution.
2. Why did you choose React for the frontend?
3. Explain how JWT authentication works in your project.
4. How did you design your MongoDB collections or SQL tables?
5. What was the hardest bug you fixed?
6. If 10,000 users use your app together, what will break first?
7. How do you protect passwords in a real application?
8. Explain one feature from your resume deeply, including tradeoffs.
4. Evaluation Rubric: Strong answers should include architecture, database design, security, complexity, challenges, and measurable impact.`;
  }

  if (prompt.toLowerCase().includes("company")) {
    return `1. Interview Pattern
Technical fundamentals, coding basics, project discussion, and HR communication.
2. Technical Questions:
1. Explain OOPS pillars with examples.
2. Difference between process and thread.
3. What is normalization in DBMS?
4. Write SQL to find the second highest salary.
5. Difference between TCP and UDP.
6. Explain stack vs queue.
7. What is a primary key and foreign key?
8. Explain HTTP vs HTTPS.
3. Coding Questions:
1. Reverse a string.
2. Find duplicates in an array.
3. Check if a number is prime.
4. HR/Behavioral Questions:
1. Tell me about yourself.
2. Why this company?
3. Explain your project.
4. Describe a challenge you faced.
5. Preparation Advice: Revise OOPS, DBMS, OS, CN, SQL queries, and your project flow.`;
  }

  return `AI Interview Questions:
1. Explain the core concept in simple words.
2. Give one real coding or project example.
3. What is the time or space complexity?
4. What edge cases can break your solution?
5. How would you improve it for production?
Feedback Rubric: correctness, clarity, completeness, complexity, and real-world tradeoffs.`;
}

export async function generateAiText(prompt: string) {
  const groqApiKey = [process.env.GROQ_API_KEY, process.env.GROQ_API_TOKEN]
    .find((value) => value?.trim())
    ?.trim();
  const googleApiKey = [
    process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    process.env.GOOGLE_API_KEY,
    process.env.GEMINI_API_KEY,
  ]
    .find((value) => value?.trim())
    ?.trim();
  const model = groqApiKey
    ? groq("llama-3.3-70b-versatile")
    : googleApiKey
      ? google("gemini-2.0-flash")
      : null;

  if (!model) {
    return fallbackFromPrompt(prompt);
  }

  try {
    const result = await generateText({
      model,
      prompt,
      temperature: 0.4,
    });

    return result.text;
  } catch (error) {
    console.error("ReadyAI provider failed. Using local fallback output.", error);
    return fallbackFromPrompt(prompt);
  }
}
