import React from 'react';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import type { Appointment } from '../../types';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: string) => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onCancel }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{appointment.serviceName}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[appointment.status]}`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      </div>
      
      <div className="space-y-3 text-gray-600 dark:text-gray-300">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{new Date(appointment.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          <span>{appointment.time}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          <span>{formatCurrency(appointment.totalPrice)}</span>
        </div>
      </div>

      {appointment.status !== 'cancelled' && (
        <button
          onClick={() => onCancel(appointment.id)}
          className="mt-4 w-full py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          Cancel Appointment
        </button>
      )}
    </div>
  );
};