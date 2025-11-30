import { stripe } from '@/lib/stripe'
import { db } from '@/configs/db'
import { Users } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { PLANS } from '@/configs/plans'
import type Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata?.userId
        const planId = session.metadata?.planId
        const billingCycle = session.metadata?.billingCycle

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        )

        // Calculate tokens based on plan
        const tokens = planId === 'pro' ? PLANS.PRO.tokens : 
                      planId === 'enterprise' ? 999999 : 100 // High number for unlimited

        // Update user subscription
        await db
          .update(Users)
          .set({
            subscription: true,
            planId,
            planType: billingCycle,
            stripeSubscriptionId: subscription.id,
            subscriptionStatus: 'active',
            currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            tokens: tokens,
          })
          .where(eq(Users.id, userId!))

        console.log(`Subscription activated for user ${userId}`)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        const subscriptionId = (invoice as any).subscription as string | null

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId as string)
          
          // Get user by subscription ID
          const users = await db
            .select()
            .from(Users)
            .where(eq(Users.stripeSubscriptionId, subscription.id))
            .limit(1)

          if (users.length > 0) {
            const user = users[0]
            const planId = user.planId || 'free'
            
            // Renew tokens on successful payment
            const tokens = planId === 'pro' ? PLANS.PRO.tokens : 
                          planId === 'enterprise' ? 999999 : 100

            await db
              .update(Users)
              .set({
                subscriptionStatus: 'active',
                currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
                tokens: tokens,
              })
              .where(eq(Users.id, user.id))

            console.log(`Tokens renewed for user ${user.id}`)
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        
        // Get user by subscription ID
        const users = await db
          .select()
          .from(Users)
          .where(eq(Users.stripeSubscriptionId, subscription.id))
          .limit(1)

        if (users.length > 0) {
          await db
            .update(Users)
            .set({
              subscriptionStatus: subscription.status,
              currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            })
            .where(eq(Users.id, users[0].id))

          console.log(`Subscription updated for user ${users[0].id}`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        
        // Get user by subscription ID
        const users = await db
          .select()
          .from(Users)
          .where(eq(Users.stripeSubscriptionId, subscription.id))
          .limit(1)

        if (users.length > 0) {
          await db
            .update(Users)
            .set({
              subscription: false,
              planId: 'free',
              subscriptionStatus: 'canceled',
              tokens: PLANS.FREE.tokens,
            })
            .where(eq(Users.id, users[0].id))

          console.log(`Subscription canceled for user ${users[0].id}`)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
