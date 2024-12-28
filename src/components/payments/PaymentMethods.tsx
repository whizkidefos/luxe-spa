import React from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  return (
    <div className="space-y-3">
      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-600 transition-colors">
        <input
          type="radio"
          name="payment"
          value="stripe"
          checked={selectedMethod === 'stripe'}
          onChange={(e) => onMethodChange(e.target.value)}
          className="mr-3"
        />
        <CreditCard className="w-5 h-5 mr-2" />
        <span>Credit Card (Stripe)</span>
      </label>
    </div>
  );
};