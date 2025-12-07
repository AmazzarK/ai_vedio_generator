import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { verifyWebhookSignature } from '@/lib/paypal';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('paypal-transmission-sig');
    const transmissionId = req.headers.get('paypal-transmission-id');
    const transmissionTime = req.headers.get('paypal-transmission-time');
    const certUrl = req.headers.get('paypal-cert-url');
    const authAlgo = req.headers.get('paypal-auth-algo');
    const webhookId = process.env.PAYPAL_WEBHOOK_ID || '';

    // Verify webhook signature
    const isValid = verifyWebhookSignature(webhookId, {
      signature,
      transmissionId,
      transmissionTime,
      certUrl,
      authAlgo
    }, body);

    if (!isValid) {
      console.error('Invalid PayPal webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    const eventType = event.event_type;

    console.log('PayPal webhook event:', eventType);

    // Handle different webhook events
    switch (eventType) {
      case 'BILLING.SUBSCRIPTION.CREATED':
        await handleSubscriptionCreated(event);
        break;

      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        await handleSubscriptionActivated(event);
        break;

      case 'BILLING.SUBSCRIPTION.UPDATED':
        await handleSubscriptionUpdated(event);
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        await handleSubscriptionCancelled(event);
        break;

      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        await handleSubscriptionSuspended(event);
        break;

      case 'BILLING.SUBSCRIPTION.EXPIRED':
        await handleSubscriptionExpired(event);
        break;

      case 'PAYMENT.SALE.COMPLETED':
        await handlePaymentCompleted(event);
        break;

      case 'PAYMENT.SALE.REFUNDED':
        await handlePaymentRefunded(event);
        break;

      default:
        console.log('Unhandled PayPal event type:', eventType);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('PayPal webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(event: any) {
  const subscription = event.resource;
  const subscriptionId = subscription.id;
  const customerId = subscription.subscriber?.payer_id;

  console.log('Subscription created:', subscriptionId);

  // Update user subscription status
  await db.update(Users)
    .set({
      paypalSubscriptionId: subscriptionId,
      paypalCustomerId: customerId,
      subscriptionStatus: 'created'
    })
    .where(eq(Users.paypalCustomerId, customerId));
}

async function handleSubscriptionActivated(event: any) {
  const subscription = event.resource;
  const subscriptionId = subscription.id;

  console.log('Subscription activated:', subscriptionId);

  // Update user subscription to active
  await db.update(Users)
    .set({
      subscriptionStatus: 'active',
      credits: 10 // Give initial credits based on plan
    })
    .where(eq(Users.paypalSubscriptionId, subscriptionId));
}

async function handleSubscriptionUpdated(event: any) {
  const subscription = event.resource;
  const subscriptionId = subscription.id;

  console.log('Subscription updated:', subscriptionId);

  // Update subscription details
  await db.update(Users)
    .set({
      subscriptionStatus: subscription.status
    })
    .where(eq(Users.paypalSubscriptionId, subscriptionId));
}

async function handleSubscriptionCancelled(event: any) {
  const subscription = event.resource;
  const subscriptionId = subscription.id;

  console.log('Subscription cancelled:', subscriptionId);

  // Mark subscription as cancelled
  await db.update(Users)
    .set({
      subscriptionStatus: 'cancelled'
    })
    .where(eq(Users.paypalSubscriptionId, subscriptionId));
}

async function handleSubscriptionSuspended(event: any) {
  const subscription = event.resource;
  const subscriptionId = subscription.id;

  console.log('Subscription suspended:', subscriptionId);

  await db.update(Users)
    .set({
      subscriptionStatus: 'suspended'
    })
    .where(eq(Users.paypalSubscriptionId, subscriptionId));
}

async function handleSubscriptionExpired(event: any) {
  const subscription = event.resource;
  const subscriptionId = subscription.id;

  console.log('Subscription expired:', subscriptionId);

  await db.update(Users)
    .set({
      subscriptionStatus: 'expired',
      credits: 0
    })
    .where(eq(Users.paypalSubscriptionId, subscriptionId));
}

async function handlePaymentCompleted(event: any) {
  const sale = event.resource;
  const subscriptionId = sale.billing_agreement_id;

  console.log('Payment completed for subscription:', subscriptionId);

  // You can add logic here to add credits when payment is received
}

async function handlePaymentRefunded(event: any) {
  const refund = event.resource;
  const saleId = refund.sale_id;

  console.log('Payment refunded:', saleId);

  // Handle refund logic if needed
}
