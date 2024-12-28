import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import type { Service } from '../types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const usePaymentProcess = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const processPayment = async (services: Service[]) => {
    setLoading(true);
    setError(undefined);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Failed to load payment processor');

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: services.reduce((sum, service) => sum + service.price * 100, 0),
          services: services.map(s => s.id),
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const { clientSecret } = await response.json();
      
      const { error: paymentError } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/appointments`,
        },
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    processPayment,
  };
};