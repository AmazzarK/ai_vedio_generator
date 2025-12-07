-- Migration: Remove Stripe columns from users table
-- Created: 2025-12-07

-- Remove Stripe-related columns
ALTER TABLE users DROP COLUMN IF EXISTS stripe_customer_id;
ALTER TABLE users DROP COLUMN IF EXISTS stripe_subscription_id;
