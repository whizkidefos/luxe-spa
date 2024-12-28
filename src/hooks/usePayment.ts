import { useState } from 'react';
import { PaymentGateway } from '../lib/payments/gateway';

const gateway = new PaymentGateway({
  stripe: { publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY },
  flutterwave: { publicKey: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY },
});

export const usePayment = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>();

  const processPayment = async (provider: string, amount: number) => {
    setProcessing(true);
    setError(undefined);

    try {
      const paymentProvider = gateway.getProvider(provider);
      const { clientSecret } = await paymentProvider.createPayment(amount);
      const result = await paymentProvider.processPayment(clientSecret);

      if (!result.success) {
        throw new Error(result.error || 'Payment failed');
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      return false;
    } finally {
      setProcessing(false);
    }
  };

  return {
    providers: gateway.getAvailableProviders(),
    processing,
    error,
    processPayment,
  };
};