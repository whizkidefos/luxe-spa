import { useState, useEffect } from 'react';
import { appointmentsApi } from '../lib/api/appointments';
import type { Appointment } from '../types';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await appointmentsApi.getAll();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: string) => {
    try {
      await appointmentsApi.cancel(id);
      setAppointments(appointments.map(apt =>
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      ));
    } catch (err) {
      setError('Failed to cancel appointment');
    }
  };

  return {
    appointments,
    loading,
    error,
    cancelAppointment,
    refresh: loadAppointments,
  };
};