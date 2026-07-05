import { config } from "dotenv";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { questions, topics } from "@/lib/db/schema";
import { questionBank, topicBank } from "@/lib/question-bank";

config({ path: ".env.local" });
config();

async function main() {
  await db
    .insert(topics)
    .values(topicBank)
    .onConflictDoUpdate({
      target: topics.id,
      set: {
        name: sql`excluded.name`,
        category: sql`excluded.category`,
      },
    });

  await db
    .insert(questions)
    .values(
      questionBank.map((question) => ({
        id: question.id,
        topicId: question.topicId,
        difficulty: question.difficulty,
        content: question.content,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanationSeed: question.explanationSeed,
      })),
    )
    .onConflictDoUpdate({
      target: questions.id,
      set: {
        topicId: sql`excluded.topic_id`,
        difficulty: sql`excluded.difficulty`,
        content: sql`excluded.content`,
        options: sql`excluded.options`,
        correctAnswer: sql`excluded.correct_answer`,
        explanationSeed: sql`excluded.explanation_seed`,
      },
    });

  console.log(`Seeded ${topicBank.length} topics and ${questionBank.length} questions.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
