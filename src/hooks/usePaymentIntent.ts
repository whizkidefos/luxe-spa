import { useState } from 'react';
import { paymentsApi } from '../api/payments';
import type { Service } from '../types';

export const usePaymentIntent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>();

  const createPaymentIntent = async (provider: 'stripe' | 'flutterwave', services: Service[]) => {
    setLoading(true);
    setError(undefined);

    try {
      if (provider === 'stripe') {
        const { clientSecret } = await paymentsApi.stripe.createPaymentIntent(services);
        setClientSecret(clientSecret);
      } else {
        const amount = services.reduce((sum, service) => sum + service.price, 0);
        const { clientSecret } = await paymentsApi.flutterwave.initializePayment(amount);
        setClientSecret(clientSecret);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create payment');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    clientSecret,
    createPaymentIntent,
  };
};