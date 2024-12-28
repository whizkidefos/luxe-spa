import React from 'react';
import { Clock, DollarSign } from 'lucide-react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
  selected?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  selected = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${
        selected ? 'ring-2 ring-purple-600' : ''
      }`}
      onClick={() => onSelect?.(service)}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={service.image}
          alt={service.name}
          className="h-48 w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {service.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center text-purple-600 font-semibold">
            <DollarSign className="w-4 h-4" />
            <span>{service.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};