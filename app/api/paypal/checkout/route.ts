import { NextRequest, NextResponse } from 'next/server';
import { createSubscription } from '@/lib/paypal';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { planId, billingCycle } = await req.json();

    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    // Get plan ID from environment based on plan and billing cycle
    let paypalPlanId: string | undefined;
    
    // Handle 'pro' and 'enterprise' plans with monthly/yearly cycles
    if (planId === 'pro') {
      paypalPlanId = billingCycle === 'yearly' 
        ? process.env.PAYPAL_PLAN_PRO_YEARLY 
        : process.env.PAYPAL_PLAN_PRO_MONTHLY;
    } else if (planId === 'enterprise') {
      paypalPlanId = billingCycle === 'yearly'
        ? process.env.PAYPAL_PLAN_ENTERPRISE_YEARLY
        : process.env.PAYPAL_PLAN_ENTERPRISE_MONTHLY;
    } else {
      // Fallback for old plan structure (basic, standard, premium, enterprise)
      switch (planId) {
        case 'basic':
          paypalPlanId = process.env.PAYPAL_PLAN_BASIC;
          break;
        case 'standard':
          paypalPlanId = process.env.PAYPAL_PLAN_STANDARD;
          break;
        case 'premium':
          paypalPlanId = process.env.PAYPAL_PLAN_PREMIUM;
          break;
        case 'enterprise':
          paypalPlanId = process.env.PAYPAL_PLAN_ENTERPRISE;
          break;
      }
    }

    if (!paypalPlanId) {
      return NextResponse.json(
        { error: 'Plan not configured' },
        { status: 500 }
      );
    }

    // Create PayPal subscription
    const subscription = await createSubscription(
      paypalPlanId,
      user.emailAddresses[0]?.emailAddress || userId
    );

    // Update user in database with PayPal subscription ID
    await db.update(Users)
      .set({
        paypalSubscriptionId: subscription.id,
        paypalCustomerId: subscription.subscriber?.payer_id || userId,
        planId: planId,
        planType: billingCycle || 'monthly',
      })
      .where(eq(Users.email, user.emailAddresses[0]?.emailAddress || ''));

    // Return approval URL for user to complete subscription
    const approvalUrl = subscription.links?.find((link: any) => link.rel === 'approve')?.href;

    return NextResponse.json({
      subscriptionId: subscription.id,
      approvalUrl: approvalUrl,
    });

  } catch (error) {
    console.error('PayPal checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
