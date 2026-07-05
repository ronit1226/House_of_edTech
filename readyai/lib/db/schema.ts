import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("student"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const topics = pgTable("topics", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  category: text("category").notNull(),
});

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  topicId: uuid("topic_id").references(() => topics.id),
  difficulty: integer("difficulty").notNull(),
  content: text("content").notNull(),
  options: jsonb("options").$type<string[]>(),
  correctAnswer: text("correct_answer").notNull(),
  explanationSeed: text("explanation_seed"),
});

export const attempts = pgTable(
  "attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    questionId: uuid("question_id").references(() => questions.id),
    submittedAnswer: text("submitted_answer"),
    isCorrect: boolean("is_correct").notNull(),
    aiExplanation: text("ai_explanation"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("attempts_user_id_idx").on(table.userId)],
);

export const masteryScores = pgTable(
  "mastery_scores",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    topicId: uuid("topic_id").references(() => topics.id),
    score: numeric("score").default("0"),
    easeFactor: numeric("ease_factor").default("2.5"),
    intervalDays: integer("interval_days").default(1),
    lastReviewedAt: timestamp("last_reviewed_at"),
    nextReviewAt: timestamp("next_review_at"),
  },
  (table) => [
    uniqueIndex("mastery_user_topic_idx").on(table.userId, table.topicId),
    index("mastery_review_queue_idx").on(table.userId, table.nextReviewAt),
  ],
);

export const mockInterviews = pgTable("mock_interviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  transcriptJson: jsonb("transcript_json").notNull(),
  aiFeedback: text("ai_feedback"),
  aiScore: numeric("ai_score"),
  createdAt: timestamp("created_at").defaultNow(),
});
