import { pgTable, varchar, boolean, timestamp, integer, serial } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  imageUrl: varchar("image_url", { length: 512 }),
  subscription: boolean("subscription").notNull().default(false),
  
  // Subscription fields
  planId: varchar("plan_id", { length: 50 }).default('free'),
  planType: varchar("plan_type", { length: 20 }).default('monthly'), // 'monthly' or 'yearly'
  stripeCustomerId: varchar("stripe_customer_id", { length: 256 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 256 }),
  subscriptionStatus: varchar("subscription_status", { length: 50 }).default('inactive'), // 'active', 'canceled', 'past_due', 'inactive'
  currentPeriodEnd: timestamp("current_period_end"),
  tokens: integer("tokens").notNull().default(100), // Token balance
  createdAt: timestamp("created_at").defaultNow(),
});

export const Videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  prompt: varchar("prompt", { length: 2000 }).notNull(),
  platform: varchar("platform", { length: 50 }).notNull(),
  videoStyle: varchar("video_style", { length: 100 }),
  duration: integer("duration"), // in seconds
  quality: varchar("quality", { length: 20 }),
  videoUrl: varchar("video_url", { length: 512 }),
  audioUrl: varchar("audio_url", { length: 512 }),
  thumbnailUrl: varchar("thumbnail_url", { length: 512 }),
  scriptContent: varchar("script_content", { length: 5000 }),
  status: varchar("status", { length: 50 }).default('processing'), // 'processing', 'completed', 'failed'
  language: varchar("language", { length: 10 }),
  tokensUsed: integer("tokens_used").default(20),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});