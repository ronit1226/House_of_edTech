# ReadyAI

ReadyAI is a Next.js application for CS/IT interview preparation. It combines a question bank, adaptive practice flow, mastery tracking, AI-generated interview prompts, and a simple dashboard so a student can prepare for placements in one place.

This README reflects the current codebase and its verified behavior.

## What the app does

The current product includes:

- User signup and login with hashed passwords and JWT-based session cookies
- Protected routes for authenticated users
- A diagnostic-style landing experience and an adaptive practice flow
- A dashboard that shows readiness, weak topics, and review priorities
- AI-generated explanations for incorrect answers
- Spaced-repetition-style review scheduling stored in the database
- A resume-based AI interview generator that accepts pasted text or uploaded files
- A company-specific interview generator for supported companies
- A study-plan generator based on weak topics, daily hours, target company, and interview date
- A mock interview flow with AI-generated questions and feedback

## Main user journeys

1. Sign up or log in
2. Visit the dashboard to see readiness and weak topics
3. Practice questions in adaptive mode
4. Review explanations and improve weaker topics
5. Use the resume AI feature to generate interview questions from a resume
6. Generate company-specific interview prompts
7. Create a personal study plan
8. Run a mock interview and receive AI feedback

## Current routes

### Pages

- /signup
- /login
- /dashboard
- /practice
- /resume-interview
- /company-interview
- /study-plan
- /mock-interview

### API routes

- /api/auth/signup
- /api/auth/login
- /api/auth/refresh
- /api/auth/logout
- /api/diagnostic/start
- /api/diagnostic/submit
- /api/attempts
- /api/mastery
- /api/mastery/review-queue
- /api/ai/resume-interview
- /api/ai/company-interview
- /api/ai/study-plan
- /api/mock-interview/start
- /api/mock-interview/respond
- /api/mock-interview/[id]

## Project structure

- app/ — Next.js App Router pages and API routes
- components/ — UI components such as the practice session, app shell, uploader, and charts
- lib/ — business logic and shared helpers
  - adaptive-engine.ts — difficulty progression logic
  - spaced-repetition.ts — review scheduling logic
  - question-bank.ts — topic and question seed data
  - validators.ts — Zod schemas for request validation
  - ai/client.ts — AI provider selection and fallback behavior
  - auth.ts — JWT/session helpers
  - db/ — Drizzle schema and database connection
- tests/ — unit and end-to-end tests
- scripts/ — database seeding and setup helpers
- drizzle/ — generated migration files

## Core features in more detail

### Authentication

Authentication uses bcrypt for password hashing and JWT-based cookies for sessions. The app stores the user session in cookies and checks authentication in protected API routes.

### Adaptive practice

The practice experience is based on a question bank and an adaptive engine. A correct answer moves the difficulty upward, while an incorrect answer lowers it. The app also stores attempts and computes a mastery score per topic.

### Dashboard and mastery tracking

The dashboard displays:

- overall readiness score
- the weakest topic
- a skill radar chart
- a weak-topic heatmap
- a review queue

Mastery data is persisted in the mastery_scores table and is used to drive the dashboard and review queue.

### Resume-based AI interview

The resume page accepts either:

- pasted resume text, or
- an uploaded .txt, .md, or .pdf file

The server route reads the content and sends it to the AI layer to generate interview questions based on the resume content.

### Company-specific interview

The company interview page lets the user choose a company and difficulty level. The request is sent to the company interview AI route and returns a company-oriented prompt set.

### Study planner

The study planner uses weak topics, desired daily study hours, target company, and an interview date to produce a study plan.

### Mock interviews

The mock interview flow creates an interview record, asks one question at a time, collects the student's answer, and returns AI-generated feedback and the next question.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI primitives
- PostgreSQL
- Drizzle ORM
- JWT auth with jose
- bcryptjs
- Zod
- Vercel AI SDK
- Google AI / Groq providers
- Recharts
- Vitest
- Playwright

## Database

The app uses PostgreSQL and Drizzle ORM. The main tables are:

- users
- topics
- questions
- attempts
- mastery_scores
- mock_interviews

The schema is defined in lib/db/schema.ts.

## Environment variables

Create a local environment file named .env.local in the project root.

Example:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/readyai
JWT_SECRET=change-this-to-a-long-random-string
GROQ_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
```

Notes:

- DATABASE_URL is required for the database connection.
- JWT_SECRET is used for signing session tokens.
- GROQ_API_KEY and GOOGLE_GENERATIVE_AI_API_KEY are optional. If neither is set, the app falls back to built-in local sample output in lib/ai/client.ts.

## Setup

Prerequisites:

- Node.js and npm
- A PostgreSQL server

Install dependencies:

```bash
npm install
```

Create or update the database schema:

```bash
npm run db:push
```

Seed the initial topic and question data:

```bash
npm run db:seed
```

Start the development server:

```bash
npm run dev
```

Then open http://localhost:3000.

## Testing and build checks

Run unit tests:

```bash
npm test
```

Run the production build:

```bash
npm run build
```

Optional lint check:

```bash
npm run lint
```

## Notes about the current implementation

- The app is currently wired to work with a PostgreSQL database and uses Drizzle migrations and schema definitions.
- AI features are available when API keys are configured; otherwise the app still returns deterministic fallback content.
- The resume uploader accepts file uploads and parses text from supported text-based files and PDF files.
- The UI currently focuses on student preparation flows; there is no active mentor dashboard in the current app surface.
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

