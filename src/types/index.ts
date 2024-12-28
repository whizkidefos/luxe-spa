export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: 'massage' | 'facial' | 'nails' | 'beauty';
  image: string;
}

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  appointments: Appointment[];
}