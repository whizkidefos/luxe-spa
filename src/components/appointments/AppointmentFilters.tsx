import React from 'react';
import type { Appointment } from '../../types';

interface AppointmentFiltersProps {
  selectedStatus: Appointment['status'] | 'all';
  onStatusChange: (status: Appointment['status'] | 'all') => void;
}

export const AppointmentFilters: React.FC<AppointmentFiltersProps> = ({
  selectedStatus,
  onStatusChange,
}) => {
  const statuses = [
    { value: 'all', label: 'All Appointments' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {statuses.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onStatusChange(value as Appointment['status'] | 'all')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedStatus === value
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};