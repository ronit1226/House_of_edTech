import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

config({ path: ".env.local" });
config();

const databaseUrl = [
  process.env.DATABASE_URL,
  process.env.POSTGRES_URL,
  process.env.POSTGRES_PRISMA_URL,
  process.env.DATABASE_URL_NON_POOLING,
].find((value) => value?.trim())?.trim() ?? "postgres://postgres:postgres@localhost:5432/readyai";

const client = postgres(databaseUrl, {
  max: 1,
});

export const db = drizzle(client, { schema });
