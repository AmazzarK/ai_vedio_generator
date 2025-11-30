import { stripe } from '@/lib/stripe'
import { db } from '@/configs/db'
import { Users } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planId, billingCycle } = await req.json()

    if (!planId || !billingCycle) {
      return NextResponse.json(
        { error: 'Missing planId or billingCycle' },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await db.select().from(Users).where(eq(Users.id, userId)).limit(1)
    
    if (!user[0]) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get price ID based on plan and billing cycle
    let priceId: string
    if (planId === 'pro') {
      priceId = billingCycle === 'yearly' 
        ? process.env.STRIPE_PRICE_PRO_YEARLY! 
        : process.env.STRIPE_PRICE_PRO_MONTHLY!
    } else if (planId === 'enterprise') {
      priceId = billingCycle === 'yearly'
        ? process.env.STRIPE_PRICE_ENTERPRISE_YEARLY!
        : process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY!
    } else {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Create or retrieve Stripe customer
    let customerId = user[0].stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user[0].email,
        name: user[0].name,
        metadata: {
          userId: userId,
        },
      })
      customerId = customer.id

      // Update user with Stripe customer ID
      await db
        .update(Users)
        .set({ stripeCustomerId: customerId })
        .where(eq(Users.id, userId))
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?canceled=true`,
      metadata: {
        userId,
        planId,
        billingCycle,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
