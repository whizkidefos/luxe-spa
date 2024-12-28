import React from 'react';
import { AppointmentCard } from '../components/appointments/AppointmentCard';
import { AppointmentFilters } from '../components/appointments/AppointmentFilters';
import { useAppointments } from '../hooks/useAppointments';
import type { Appointment } from '../types';

const Appointments = () => {
  const { appointments, loading, error, cancelAppointment } = useAppointments();
  const [selectedStatus, setSelectedStatus] = React.useState<Appointment['status'] | 'all'>('all');

  const filteredAppointments = appointments.filter(
    (appointment) => selectedStatus === 'all' || appointment.status === selectedStatus
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>
      
      <AppointmentFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {filteredAppointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300">No appointments found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={cancelAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;