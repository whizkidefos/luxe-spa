import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { stripe } from '../../lib/stripe';
import type { Service } from '../../types';

interface PaymentFormProps {
  services: Service[];
  onSuccess: () => void;
  clientSecret: string;
}

const CheckoutForm: React.FC<Omit<PaymentFormProps, 'clientSecret'>> = ({
  onSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(undefined);

    try {
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/appointments`,
        },
      });

      if (paymentError) {
        setError(paymentError.message);
      } else {
        onSuccess();
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export const PaymentForm: React.FC<PaymentFormProps> = ({
  clientSecret,
  ...props
}) => {
  return (
    <Elements stripe={stripe} options={{ clientSecret }}>
      <CheckoutForm {...props} />
    </Elements>
  );
};