import { pgTable, varchar, boolean, timestamp, integer } from "drizzle-orm/pg-core";

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