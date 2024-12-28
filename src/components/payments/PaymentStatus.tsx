import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface PaymentStatusProps {
  status: 'success' | 'error';
  message: string;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, message }) => {
  return (
    <div className={`p-4 rounded-lg ${
      status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}>
      <div className="flex items-center gap-2">
        {status === 'success' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <XCircle className="w-5 h-5" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};