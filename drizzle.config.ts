import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEON_PUBLIC_DATABASE_URL!,
  },
});
