import { create } from 'zustand';
import type { Service } from '../types';

interface BookingStore {
  selectedServices: Service[];
  totalPrice: number;
  addService: (service: Service) => void;
  removeService: (serviceId: string) => void;
  clearServices: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  selectedServices: [],
  totalPrice: 0,
  addService: (service) =>
    set((state) => ({
      selectedServices: [...state.selectedServices, service],
      totalPrice: state.totalPrice + service.price,
    })),
  removeService: (serviceId) =>
    set((state) => {
      const service = state.selectedServices.find((s) => s.id === serviceId);
      return {
        selectedServices: state.selectedServices.filter((s) => s.id !== serviceId),
        totalPrice: state.totalPrice - (service?.price || 0),
      };
    }),
  clearServices: () =>
    set({
      selectedServices: [],
      totalPrice: 0,
    }),
}));