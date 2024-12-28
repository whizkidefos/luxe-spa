import type { PaymentProvider } from './types';

export class FlutterwaveProvider implements PaymentProvider {
  private flw: any;
  name = 'flutterwave';

  async initialize() {
    this.flw = (window as any).FlutterwaveCheckout;
  }

  async createPayment(amount: number) {
    const response = await fetch('/api/payments/flutterwave/initialize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error('Failed to initialize payment');
    }

    return response.json();
  }

  async processPayment(clientSecret: string) {
    return new Promise((resolve) => {
      this.flw({
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: clientSecret,
        amount: amount,
        currency: 'USD',
        payment_options: 'card,ussd',
        callback: (response: any) => {
          resolve({ success: response.status === 'successful' });
        },
        onclose: () => {
          resolve({ success: false, error: 'Payment cancelled' });
        },
      });
    });
  }
}