// PayPal SDK Configuration
// @ts-ignore - PayPal SDK doesn't have TypeScript definitions
import paypal from '@paypal/checkout-server-sdk';

// Configure PayPal environment
function environment(): any {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
  const mode = process.env.PAYPAL_MODE || 'sandbox';

  if (mode === 'live') {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

// Create PayPal client
export const paypalClient = new paypal.core.PayPalHttpClient(environment());

// Helper function to create subscription
export async function createSubscription(planId: string, customerId: string): Promise<any> {
  // @ts-ignore
  const request = new paypal.subscriptions.SubscriptionsCreateRequest();
  request.requestBody({
    plan_id: planId,
    subscriber: {
      name: {
        given_name: "Customer",
        surname: "User"
      },
      email_address: customerId // Use user email
    },
    application_context: {
      brand_name: "VideoAI Pro",
      locale: "en-US",
      shipping_preference: "NO_SHIPPING",
      user_action: "SUBSCRIBE_NOW",
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`
    }
  });

  try {
    const response = await paypalClient.execute(request);
    return response.result;
  } catch (error) {
    console.error('PayPal subscription creation error:', error);
    throw error;
  }
}

// Helper function to get subscription details
export async function getSubscription(subscriptionId: string): Promise<any> {
  // @ts-ignore
  const request = new paypal.subscriptions.SubscriptionsGetRequest(subscriptionId);
  
  try {
    const response = await paypalClient.execute(request);
    return response.result;
  } catch (error) {
    console.error('PayPal get subscription error:', error);
    throw error;
  }
}

// Helper function to cancel subscription
export async function cancelSubscription(subscriptionId: string, reason: string = 'Customer requested cancellation'): Promise<boolean> {
  // @ts-ignore
  const request = new paypal.subscriptions.SubscriptionsCancelRequest(subscriptionId);
  request.requestBody({
    reason: reason
  });

  try {
    await paypalClient.execute(request);
    return true;
  } catch (error) {
    console.error('PayPal cancel subscription error:', error);
    throw error;
  }
}

// Verify PayPal webhook signature
export function verifyWebhookSignature(
  webhookId: string,
  headers: any,
  body: any
): boolean {
  // PayPal webhook verification logic
  // You'll need to implement this based on PayPal's webhook verification
  // For now, return true (implement proper verification in production)
  return true;
}

export default paypalClient;
