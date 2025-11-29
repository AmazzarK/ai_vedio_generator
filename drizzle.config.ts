import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEON_PUBLIC_DATABASE_URL!,
  },
});
