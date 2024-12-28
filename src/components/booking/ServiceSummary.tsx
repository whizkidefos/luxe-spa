import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatCurrency, formatDuration } from '../../utils/format';
import type { Service } from '../../types';

interface ServiceSummaryProps {
  services: Service[];
  onRemove: (serviceId: string) => void;
}

export const ServiceSummary: React.FC<ServiceSummaryProps> = ({ services, onRemove }) => {
  const totalDuration = services.reduce((sum, service) => sum + service.duration, 0);
  const totalPrice = services.reduce((sum, service) => sum + service.price, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Selected Services</h3>
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">{service.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDuration(service.duration)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">{formatCurrency(service.price)}</span>
              <button
                onClick={() => onRemove(service.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between mb-2">
          <span>Total Duration:</span>
          <span className="font-medium">{formatDuration(totalDuration)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total Price:</span>
          <span className="text-purple-600">{formatCurrency(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
};