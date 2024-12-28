import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceSummary } from '../components/booking/ServiceSummary';
import { DateTimePicker } from '../components/booking/DateTimePicker';
import { PaymentSection } from '../components/payments/PaymentSection';
import { useBookingStore } from '../store/bookingStore';
import { appointmentsApi } from '../lib/api/appointments';
import { useAuthStore } from '../store/authStore';

const AVAILABLE_TIMES = [
  '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const Book = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { selectedServices, clearServices } = useBookingStore();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState(AVAILABLE_TIMES[0]);

  const handlePaymentSuccess = async () => {
    try {
      // Create appointments for all selected services
      await Promise.all(
        selectedServices.map((service) =>
          appointmentsApi.create({
            userId: user!.id,
            serviceId: service.id,
            serviceName: service.name,
            date: selectedDate,
            time: selectedTime,
            status: 'pending',
            totalPrice: service.price,
          })
        )
      );

      clearServices();
      navigate('/appointments');
    } catch (error) {
      console.error('Failed to create appointments:', error);
    }
  };

  if (selectedServices.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">No Services Selected</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Please select services before proceeding with booking.
        </p>
        <button
          onClick={() => navigate('/services')}
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
        >
          Browse Services
        </button>
      </div>
    );
  }

  const totalAmount = selectedServices.reduce((sum, service) => sum + service.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ServiceSummary
            services={selectedServices}
            onRemove={(id) => removeService(id)}
          />
          <DateTimePicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
            availableTimes={AVAILABLE_TIMES}
          />
        </div>
        
        <div>
          <PaymentSection
            amount={totalAmount}
            onSuccess={handlePaymentSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default Book;