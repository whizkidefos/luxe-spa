import { stripe } from '../stripe';
import type { Service } from '../../types';

export const paymentsApi = {
  async createPaymentIntent(services: Service[]) {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: services.reduce((sum, service) => sum + service.price * 100, 0),
        services: services.map(service => service.id),
      }),
    });

    if (!response.ok) {
      throw new Error('Payment failed');
    }

    const { clientSecret } = await response.json();
    return clientSecret;
  },
};