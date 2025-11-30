# Payment System Setup Guide

## 🚀 Stripe Integration Complete!

Your AI Video Generator now has a complete payment system with 3 pricing tiers.

## 📋 Setup Steps

### 1. Get Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable Key** and **Secret Key** (use test keys for development)
3. Update `.env.local` with your keys:
   ```bash
   STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
   ```

### 2. Create Products and Prices in Stripe

1. Go to [Stripe Products](https://dashboard.stripe.com/test/products)
2. Click **"+ Add product"**
3. Create **4 products**:

   **Product 1: Pro Monthly**
   - Name: `Pro Monthly`
   - Price: `$19/month` (recurring)
   - Copy the Price ID (starts with `price_`)
   
   **Product 2: Pro Yearly**
   - Name: `Pro Yearly`
   - Price: `$190/year` (recurring)
   - Copy the Price ID
   
   **Product 3: Enterprise Monthly**
   - Name: `Enterprise Monthly`
   - Price: `$49/month` (recurring)
   - Copy the Price ID
   
   **Product 4: Enterprise Yearly**
   - Name: `Enterprise Yearly`
   - Price: `$490/year` (recurring)
   - Copy the Price ID

4. Update `.env.local` with all 4 Price IDs:
   ```bash
   STRIPE_PRICE_PRO_MONTHLY=price_xxxxx
   STRIPE_PRICE_PRO_YEARLY=price_xxxxx
   STRIPE_PRICE_ENTERPRISE_MONTHLY=price_xxxxx
   STRIPE_PRICE_ENTERPRISE_YEARLY=price_xxxxx
   ```

### 3. Set Up Webhook (for local testing)

1. Install Stripe CLI:
   ```bash
   # Windows (using Scoop)
   scoop install stripe
   
   # Or download from: https://stripe.com/docs/stripe-cli
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. Copy the webhook secret (starts with `whsec_`) and add to `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

### 4. Test the Payment Flow

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Keep the Stripe CLI running in another terminal:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

3. Visit: `http://localhost:3000/pricing`

4. Click "Subscribe Now" on Pro or Enterprise plan

5. Use Stripe test card:
   - Card Number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

6. Complete payment and check:
   - User gets redirected to dashboard
   - Database updated with subscription
   - Tokens added to account
   - Stripe CLI shows webhook events

## 🎨 Features Included

### ✅ Pricing Page (`/pricing`)
- 3 plans: Free, Pro, Enterprise
- Monthly/Yearly billing toggle
- 17% discount on yearly plans
- Responsive design
- Multilingual support (AR/FR/EN)

### ✅ Database Schema
- `planId`: Current plan (free/pro/enterprise)
- `planType`: Billing cycle (monthly/yearly)
- `stripeCustomerId`: Stripe customer ID
- `stripeSubscriptionId`: Stripe subscription ID
- `subscriptionStatus`: active/canceled/past_due/inactive
- `currentPeriodEnd`: Subscription end date
- `tokens`: Token balance

### ✅ API Routes
- `/api/stripe/checkout` - Create checkout session
- `/api/stripe/webhook` - Handle Stripe events

### ✅ Stripe Webhooks Handled
- `checkout.session.completed` - Activate subscription
- `invoice.payment_succeeded` - Renew tokens
- `customer.subscription.updated` - Update subscription
- `customer.subscription.deleted` - Cancel subscription

## 📊 Plan Details

### Free Plan
- 100 tokens/month
- 720p quality
- 30 basic styles
- Watermark
- Watch ads for tokens

### Pro Plan - $19/mo or $190/year
- 500 tokens/month
- 1080p HD quality
- 90+ styles
- No watermark
- Priority rendering
- 50% faster generation

### Enterprise Plan - $49/mo or $490/year
- Unlimited tokens
- 4K UHD quality
- All styles + custom
- API access
- Team collaboration
- 24/7 support

## 🔐 Production Deployment

### 1. Switch to Live Mode
1. Go to Stripe Dashboard → toggle from "Test" to "Live"
2. Get your live API keys
3. Update production environment variables

### 2. Set Up Production Webhook
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"+ Add endpoint"**
3. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the signing secret and add to production env

## 🎯 Next Steps

- [ ] Add subscription management in Settings page
- [ ] Implement token deduction on video generation
- [ ] Add usage analytics
- [ ] Create admin dashboard
- [ ] Add invoice download feature
- [ ] Implement plan upgrade/downgrade flow

## 💡 Tips

- Always test with Stripe test mode first
- Keep webhook secret secure
- Monitor webhook events in Stripe Dashboard
- Test all subscription scenarios (upgrade, downgrade, cancel)
- Add error handling for failed payments

## 🆘 Troubleshooting

**Problem: Webhook not receiving events**
- Make sure Stripe CLI is running
- Check webhook URL is correct
- Verify webhook secret in .env.local

**Problem: Checkout redirects to 404**
- Verify `NEXT_PUBLIC_APP_URL` is correct
- Check success_url and cancel_url paths

**Problem: Database not updating**
- Check webhook handler logs
- Verify database connection
- Run `npm run db:push` to sync schema

---

Need help? Check the [Stripe Documentation](https://stripe.com/docs)
