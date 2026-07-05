# 🎓 ReadyAI - AI-Powered Interview Preparation Platform

> *Your personal AI mentor for placement and interview preparation*

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-18%2B-green.svg)]()
[![Next.js](https://img.shields.io/badge/next.js-14-black.svg)]()

ReadyAI is an intelligent, AI-powered interview and placement preparation platform for CS/IT students. It helps students identify weak topics, practice with adaptive questions, get AI-powered explanations, and prepare with company-specific strategies.

## 🎯 Why ReadyAI?

The problem: Most students don't know **what to study** for placements and interviews.

**The solution:** ReadyAI works like a **personal AI mentor** that:
- 📊 Identifies weak topics through diagnostic testing
- 🧠 Adapts difficulty based on your performance
- 🤖 Provides AI-powered explanations for mistakes
- 🎯 Generates company-specific interview questions
- 📈 Tracks your progress with analytics
- 📚 Creates personalized study plans

## 🚀 Complete User Journey

```
1. Signup/Login
2. Take Diagnostic Test
3. Practice Adaptive Questions (Dynamic Difficulty)
4. Get AI Explanations for Wrong Answers
5. Review Dashboard (Weak Topics, Progress)
6. Resume-Based AI Interview
7. Company-Specific Interview Prep
8. Generate Study Plan
9. Mock Interviews
10. Master Topics with Spaced Repetition
```

## Features

### 1. Authentication

- User can signup and login.
- Password is hashed using bcrypt.
- JWT access token and refresh token are used.
- Protected API routes check authentication.
- User data is stored in PostgreSQL.

Pages:

```text
/signup
/login
```

API routes:

```text
/api/auth/signup
/api/auth/login
/api/auth/refresh
/api/auth/logout
```

### 2. Adaptive Practice

Students can practice real interview-style questions.

Subjects included:

- Arrays
- Dynamic Programming
- Trees and Graphs
- DBMS and SQL
- Operating System
- OOPS

The student can select the subject from the practice page.

How adaptive logic works:

```text
Correct answer -> next question becomes harder
Wrong answer -> next question becomes easier
```

Page:

```text
/practice
```

Important files:

```text
lib/question-bank.ts
lib/adaptive-engine.ts
components/practice-session.tsx
```

### 3. AI Explanation

When a student gives a wrong answer, ReadyAI asks AI to explain the mistake.

The explanation is based on:

- Question
- Correct answer
- Student wrong answer
- Topic
- Explanation seed

This makes it better than only showing "wrong answer".

### 4. Spaced Repetition

ReadyAI uses an SM-2 style review scheduler.

This means weak topics come back for revision later.

Example:

```text
Wrong answer today -> topic appears again soon
Correct answer multiple times -> review interval increases
```

Important file:

```text
lib/spaced-repetition.ts
```

### 5. Dashboard

Dashboard shows:

- Overall readiness score
- Weak topic priority
- Skill radar chart
- Weak topic heatmap
- Today review queue
- Links to AI features

Page:

```text
/dashboard
```

### 6. Resume-Based AI Interview

This is one of the best features.

Student can upload or paste resume text.

ReadyAI reads the resume and generates interview questions from:

- Skills
- Projects
- Internship
- Experience
- Target company

Example:

If resume has React, Node.js, MongoDB, ReadyAI can ask:

```text
Why did you use MongoDB?
Explain JWT authentication.
Tell me about your AI Resume Builder project.
What challenge did you face?
```

Page:

```text
/resume-interview
```

API:

```text
/api/ai/resume-interview
```

### 7. Company-Specific Interview

Different companies ask different types of questions.

ReadyAI supports:

- Google
- Amazon
- Microsoft
- TCS
- Infosys
- Accenture
- Capgemini
- Cognizant

Example:

TCS focuses more on:

- OOPS
- DBMS
- OS
- CN
- Easy coding

Amazon focuses more on:

- DSA
- Projects
- Behavioral questions
- System thinking

Page:

```text
/company-interview
```

API:

```text
/api/ai/company-interview
```

### 8. AI Study Planner

ReadyAI creates a study timetable based on:

- Weak topics
- Daily study hours
- Target company
- Interview date

Example:

```text
Today:
Graphs - 45 min
Operating System - 30 min
SQL - 30 min
Mock interview - 20 min
```

Page:

```text
/study-plan
```

API:

```text
/api/ai/study-plan
```

### 9. AI Mock Interview

ReadyAI can conduct a short mock interview.

Flow:

```text
Start interview
AI asks question
Student answers
AI gives feedback
Next question
Final feedback
```

Page:

```text
/mock-interview
```

API:

```text
/api/mock-interview/start
/api/mock-interview/respond
/api/mock-interview/[id]
```

## Tech Stack

```text
Next.js 16
React
TypeScript
Tailwind CSS
Radix/shadcn-style UI
PostgreSQL Neon
Drizzle ORM
JWT Auth
bcrypt
Zod validation
Vercel AI SDK
Gemini/Groq AI
Recharts
Vitest
Playwright
```

## Database Tables

Main tables:

```text
users
topics
questions
attempts
mastery_scores
mock_interviews
```

Important database features:

- Users are stored securely.
- Password hashes are stored, not real passwords.
- Attempts store user answers.
- Mastery scores store topic readiness.
- Mock interviews store transcript and feedback.

## Environment Variables

Create a file:

```text
.env.local
```

Add:

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
GROQ_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

If Gemini is not working, check that the key is correct. Gemini API keys usually come from Google AI Studio.

## How To Run

Open terminal inside project folder:

```text
C:\Users\PC\Desktop\House of ed tech\readyai
```

Run:

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

Open:

```text
http://localhost:3000
```

## Testing

Run:

```bash
npm test
npm run lint
npm run build
```

Current tests cover:

- Adaptive difficulty engine
- Spaced repetition scheduler

## Security

Security features used:

- bcrypt password hashing
- JWT authentication
- httpOnly cookies
- Zod input validation
- Protected API routes
- Row-level user ownership checks
- No plaintext password storage
- No real secrets committed

## Assignment Explanation

This project is not a normal quiz app or CRUD app.

The main value is:

- Adaptive difficulty algorithm
- Spaced repetition scheduler
- AI explanation
- Resume-based interview
- Company-specific preparation
- Study planner
- Dashboard analytics

This makes ReadyAI look like a real AI placement preparation platform.

## Known Limitations

- Resume PDF upload works best when text is readable. If PDF text is not extracted properly, paste resume text manually.
- AI quality depends on valid Gemini or Groq API key.
- Before final submission, replace placeholder GitHub and LinkedIn links in footer.
- Rotate any API keys that were pasted in chat.

## Final Submission Checklist

- GitHub repository
- Live Vercel deployment
- `.env.example` present
- README present
- Neon database connected
- Seed data added
- Footer has name, GitHub, LinkedIn
- App builds successfully

