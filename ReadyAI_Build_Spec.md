# ReadyAI — AI-Powered Adaptive Skill Readiness Platform

> Build spec for House of Edtech — Fullstack Developer Fulltime Assignment 2 (Jan 2026)
> Paste this entire document into your AI coding agent as the primary instruction set.

---

## 1. Project Summary

Build **ReadyAI**, a full-stack web application for CS/IT students preparing for technical interviews and placements. The platform diagnoses a student's weak topics through an adaptive assessment, schedules spaced-repetition review using an SM-2-style algorithm, generates AI-personalized explanations for wrong answers, visualizes readiness through an analytics dashboard, and runs an AI-driven mock interview that gives qualitative feedback.

This is **not** a to-do list, task manager, course-management system, or basic CRUD app. The core value is the **adaptive difficulty algorithm** and the **spaced-repetition scheduling engine** — CRUD operations exist only to support these systems, not as the product itself.

---

## 2. Tech Stack (mandatory — do not substitute)

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, Server Actions + Route Handlers) |
| UI | React.js + Tailwind CSS + shadcn/ui (radix-based components) |
| Database | PostgreSQL (hosted on Neon or Supabase — free tier) |
| ORM | Drizzle ORM (preferred for type-safe SQL) or Prisma |
| Auth | JWT-based (access + refresh token pattern), bcrypt for password hashing |
| AI | Vercel AI SDK + Groq (primary, fast + free tier) with Gemini as fallback provider |
| Charts | Recharts (for radar chart + heatmap) |
| Validation | Zod on every input boundary (API routes + forms) |
| Testing | Vitest (unit) + Playwright (integration/E2E) |
| Deployment | Vercel, connected to GitHub for CI/CD (auto-deploy on push to `main`) |
| Version Control | Git, meaningful commit history (not one giant commit) |

---

## 3. Database Schema

Use this as the source of truth. Written in Drizzle-style pseudo-SQL; translate to your ORM of choice.

```sql
-- users
users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student', -- 'student' | 'mentor'
  created_at TIMESTAMP DEFAULT now()
)

-- topics
topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,             -- e.g. "Arrays", "Dynamic Programming", "SQL Joins"
  category TEXT NOT NULL          -- e.g. "DSA", "System Design", "CS Fundamentals"
)

-- questions
questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES topics(id),
  difficulty INT NOT NULL,        -- 1 (easy) to 5 (hard)
  content TEXT NOT NULL,
  options JSONB,                  -- for MCQ format: ["a","b","c","d"]
  correct_answer TEXT NOT NULL,
  explanation_seed TEXT           -- base explanation, AI personalizes on top of this
)

-- attempts
attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  question_id UUID REFERENCES questions(id),
  submitted_answer TEXT,
  is_correct BOOLEAN NOT NULL,
  ai_explanation TEXT,            -- generated only when wrong
  created_at TIMESTAMP DEFAULT now()
)

-- mastery_scores
mastery_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  topic_id UUID REFERENCES topics(id),
  score NUMERIC DEFAULT 0,        -- 0-100 mastery score
  ease_factor NUMERIC DEFAULT 2.5,-- SM-2 ease factor
  interval_days INT DEFAULT 1,    -- SM-2 interval
  last_reviewed_at TIMESTAMP,
  next_review_at TIMESTAMP,
  UNIQUE(user_id, topic_id)
)

-- mock_interviews
mock_interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  transcript_json JSONB NOT NULL, -- [{role, content, timestamp}]
  ai_feedback TEXT,
  ai_score NUMERIC,               -- optional, 0-100
  created_at TIMESTAMP DEFAULT now()
)
```

**Indexes to add:** `attempts(user_id)`, `mastery_scores(user_id, next_review_at)` — the review queue query depends on this.

---

## 4. Core Feature Modules

### 4.1 Authentication & Authorization
- Signup/login with email + password (bcrypt hash, never store plaintext)
- JWT access token (short-lived, ~15min) + refresh token (httpOnly cookie, ~7 days)
- Middleware protecting all `/api/*` routes except `/api/auth/*`
- Role check: `student` can only access their own `attempts`, `mastery_scores`, `mock_interviews` — enforce this at the query level (`WHERE user_id = session.userId`), never trust a client-supplied user ID
- `mentor` role can view **aggregated, anonymized** cohort statistics only — never individual student data (this is your authorization design story for the write-up)

### 4.2 Diagnostic Assessment
- On first login, student takes a diagnostic quiz: ~2-3 questions per topic at medium difficulty
- Seed database with 60-80 questions across 5-6 topics (Arrays, DP, Trees/Graphs, SQL, OS/CN basics, System Design fundamentals)
- Result initializes `mastery_scores` per topic

### 4.3 Adaptive Difficulty Engine
- After each answer:
  - Correct → next question in that topic is one difficulty level higher (cap at 5)
  - Incorrect → next question is one difficulty level lower (floor at 1), topic flagged as weak
- Mastery score formula (simple, defensible): `score = (correct_weighted_by_difficulty / total_attempted_weighted_by_difficulty) * 100`
- This logic lives in a pure, testable function — e.g. `lib/adaptive-engine.ts` — so it's unit-testable in isolation

### 4.4 Spaced Repetition Scheduler (SM-2-lite)
- On each review of a topic, update `ease_factor`, `interval_days`, and `next_review_at` using simplified SM-2:
  ```
  if quality (based on correctness) >= 3:
    interval = interval * ease_factor
  else:
    interval = 1
  ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  ease_factor = max(ease_factor, 1.3)
  next_review_at = now + interval days
  ```
- Dashboard shows a "Due for Review" queue: topics where `next_review_at <= now`

### 4.5 AI-Personalized Explanations
- Triggered only on incorrect answers
- Prompt AI SDK with: question content, correct answer, student's wrong answer, topic, `explanation_seed`
- Ask for a explanation tailored to the specific misconception implied by their wrong answer (not a generic answer key)
- Cache/store the explanation in `attempts.ai_explanation` — don't regenerate on every view

### 4.6 Analytics Dashboard
- Skill radar chart (Recharts) — one axis per topic, value = mastery score
- Weak-topic heatmap — visual intensity by inverse mastery score
- Overall "Readiness Score" — weighted average across all topics
- "Review due today" list, linking directly into a focused review session

### 4.7 AI Mock Interview
- Chat-style UI: AI asks a technical/behavioral question relevant to the student's weakest topics
- Student responds (text)
- AI evaluates: clarity, correctness, completeness → gives qualitative feedback (2-3 sentences) + optional numeric score
- Store full transcript in `mock_interviews.transcript_json`
- Keep this feature scoped: 5-8 question mock session, not an open-ended infinite chat, to keep AI costs and complexity bounded

---

## 5. API Route Structure

```
/api/auth/signup            POST
/api/auth/login              POST
/api/auth/refresh            POST
/api/auth/logout             POST

/api/diagnostic/start        POST   -- initializes diagnostic quiz
/api/diagnostic/submit       POST   -- submits one answer, returns next question

/api/attempts                POST   -- submit answer during regular practice
/api/attempts/[id]/explain   GET    -- fetch AI explanation for an attempt

/api/mastery                 GET    -- current user's mastery scores per topic
/api/mastery/review-queue    GET    -- topics due for review

/api/mock-interview/start    POST
/api/mock-interview/respond  POST
/api/mock-interview/[id]     GET    -- fetch transcript + feedback

/api/mentor/cohort-stats     GET    -- mentor-only, aggregated data
```

Every route: validate input with Zod, verify JWT, enforce row-level ownership on queries.

---

## 6. Folder Structure

```
readyai/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── (auth)/signup/page.tsx
│   ├── (dashboard)/dashboard/page.tsx
│   ├── (dashboard)/practice/page.tsx
│   ├── (dashboard)/mock-interview/page.tsx
│   ├── (dashboard)/mentor/page.tsx
│   ├── api/... (route handlers per section 5)
│   └── layout.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── charts/RadarChart.tsx
│   ├── charts/WeakTopicHeatmap.tsx
│   └── QuestionCard.tsx
├── lib/
│   ├── db/schema.ts
│   ├── db/index.ts
│   ├── adaptive-engine.ts       -- pure, unit-tested
│   ├── spaced-repetition.ts     -- pure, unit-tested
│   ├── auth.ts                  -- JWT sign/verify helpers
│   └── ai/client.ts              -- AI SDK wrapper
├── tests/
│   ├── unit/adaptive-engine.test.ts
│   ├── unit/spaced-repetition.test.ts
│   └── e2e/diagnostic-flow.spec.ts
├── drizzle/ (migrations)
├── seed/questions.json           -- 60-80 seeded questions
├── .env.example
├── README.md
└── package.json
```

---

## 7. Security & Real-World Considerations (must document in README)

- **Input validation:** Zod schemas on every API boundary; never trust client input
- **Authorization:** row-level ownership checks on every query touching user data; mentor role limited to aggregates
- **Password security:** bcrypt with adequate salt rounds; never log or return password hashes
- **JWT handling:** short-lived access tokens, httpOnly refresh cookie, rotate on refresh
- **Rate limiting:** basic rate limit on `/api/auth/login` to reduce brute-force risk (even a simple in-memory or Vercel KV-based limiter is enough to demonstrate awareness)
- **AI cost/abuse control:** cap mock-interview session length; don't let a user trigger unbounded AI calls
- **Scalability:** discuss indexing strategy (already applied above), and note that mastery/review-queue queries are indexed for the access pattern
- **Error handling:** consistent API error shape (`{ error: string, code: string }`), no raw stack traces returned to client

---

## 8. Testing Plan (Good to Have — do this, it's scored)

- **Unit tests:** `adaptive-engine.ts` (difficulty progression logic) and `spaced-repetition.ts` (SM-2 interval math) — these are pure functions, easiest to test well and most impressive to show
- **Integration tests:** signup → login → diagnostic → dashboard flow
- **E2E (Playwright):** one full user journey — signup, take diagnostic, answer wrong on purpose, verify AI explanation appears, check dashboard updates

Even 8-10 well-chosen tests across these layers looks far more intentional than 0 tests or 50 shallow ones.

---

## 9. Deployment & CI/CD

- Push to GitHub, connect repo to Vercel
- Vercel auto-deploys `main` on push (this satisfies the CI/CD requirement — document it explicitly in the README so evaluators don't miss it)
- Environment variables (`DATABASE_URL`, `JWT_SECRET`, `GROQ_API_KEY`, etc.) set in Vercel dashboard, never committed
- Include `.env.example` in repo showing required variables without real values

---

## 10. Submission Checklist (do not skip any of these)

- [ ] GitHub repository (public or with evaluator access), clean commit history
- [ ] Live deployment link (Vercel)
- [ ] Footer on every page with: name, GitHub profile link, LinkedIn profile link
- [ ] README.md containing: project overview, architecture explanation, setup instructions, security/scalability write-up, known limitations
- [ ] `.env.example` present, no real secrets committed
- [ ] Seed script or seed data included so evaluator can run it locally

---

## 11. Build Order (5-day sequence)

1. **Day 1:** Repo + Next.js 16 + TS + Tailwind + shadcn setup → Postgres schema pushed → JWT auth working → deploy skeleton to Vercel immediately
2. **Day 2:** Seed questions → diagnostic quiz flow → adaptive difficulty engine → persist attempts + mastery scores
3. **Day 3:** Spaced repetition scheduler → review queue → AI explanation generation on wrong answers
4. **Day 4:** Analytics dashboard (radar chart, heatmap, readiness score) → mock interview chat + AI feedback
5. **Day 5:** Zod validation everywhere → error handling pass → tests → README write-up → footer → final deploy check

---

*End of spec. Build this exactly — do not add course-management, to-do-list, or generic CRUD features, as these are explicitly disqualifying per the assignment brief.*
