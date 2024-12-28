import { supabase } from '../supabase';
import type { Service } from '../../types';

export const servicesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  async getByCategory(category: Service['category']) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('category', category)
      .order('name');

    if (error) throw error;
    return data;
  }
};