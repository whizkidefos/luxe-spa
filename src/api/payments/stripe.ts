import { stripe } from '../../lib/stripe';
import type { Service } from '../../types';

export const createPaymentIntent = async (services: Service[]) => {
  const amount = services.reduce((sum, service) => sum + service.price * 100, 0);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      services: services.map(s => s.id).join(','),
    },
  });

  return { clientSecret: paymentIntent.client_secret };
};