import { supabase } from '../supabase';
import type { Appointment } from '../../types';

export const appointmentsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;
    return data as Appointment[];
  },

  async create(appointment: Omit<Appointment, 'id'>) {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointment)
      .select()
      .single();

    if (error) throw error;
    return data as Appointment;
  },

  async cancel(id: string) {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (error) throw error;
  }
};