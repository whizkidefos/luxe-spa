import React, { useState } from 'react';
import { PaymentMethods } from './PaymentMethods';
import { PaymentStatus } from './PaymentStatus';
import { usePaymentProcess } from '../../hooks/usePaymentProcess';
import { formatCurrency } from '../../utils/format';
import type { Service } from '../../types';

interface PaymentSectionProps {
  services: Service[];
  onSuccess: () => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  services,
  onSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const { loading, error, processPayment } = usePaymentProcess();

  const handlePayment = async () => {
    const success = await processPayment(services);
    if (success) {
      onSuccess();
    }
  };

  const totalAmount = services.reduce((sum, service) => sum + service.price, 0);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
      
      <PaymentMethods
        selectedMethod={paymentMethod}
        onMethodChange={setPaymentMethod}
      />

      {error && (
        <PaymentStatus
          status="error"
          message={error}
        />
      )}

      <div className="pt-4 border-t">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total Amount:</span>
          <span className="text-purple-600">{formatCurrency(totalAmount)}</span>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Complete Payment'}
        </button>
      </div>
    </div>
  );
};