import { loadStripe } from '@stripe/stripe-js';
import type { PaymentProvider } from './types';

export class StripeProvider implements PaymentProvider {
  private stripe: any;
  name = 'stripe';

  async initialize() {
    this.stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  }

  async createPayment(amount: number) {
    const response = await fetch('/api/payments/stripe/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment');
    }

    return response.json();
  }

  async processPayment(clientSecret: string) {
    const { error } = await this.stripe.confirmPayment({
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/appointments`,
      },
    });

    return {
      success: !error,
      error: error?.message,
    };
  }
}