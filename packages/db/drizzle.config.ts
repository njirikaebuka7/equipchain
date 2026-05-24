import { defineConfig } from "drizzle-kit";
import path from "path";
import dotenv from "dotenv";

// Hydrate environment variables from the monorepo workspace root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const databaseUrl = process.env.DATABASE_URL || "";

if (!databaseUrl && process.env.NODE_ENV === "production") {
  throw new Error("DATABASE_URL, ensure the database is provisioned in production");
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "../../supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
