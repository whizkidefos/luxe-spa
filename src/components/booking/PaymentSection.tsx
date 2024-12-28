import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

interface PaymentSectionProps {
  totalAmount: number;
  onProceed: () => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  totalAmount,
  onProceed,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
        <div className="space-y-3">
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-600 transition-colors">
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={(e) => setPaymentMethod(e.target.value as 'stripe')}
              className="mr-3"
            />
            <CreditCard className="w-5 h-5 mr-2" />
            <span>Credit Card</span>
          </label>
          
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-600 transition-colors">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
              className="mr-3"
            />
            <span className="font-semibold text-[#003087]">Pay</span>
            <span className="font-semibold text-[#009cde]">Pal</span>
          </label>
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total to Pay:</span>
          <span className="text-purple-600">{formatCurrency(totalAmount)}</span>
        </div>
        <button
          onClick={onProceed}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};