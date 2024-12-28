import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryFilter } from '../components/CategoryFilter';
import { ServiceCard } from '../components/ServiceCard';
import { services } from '../data/services';
import { useBookingStore } from '../store/bookingStore';
import type { Service } from '../types';

const Services = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Service['category'] | 'all'>('all');
  const { selectedServices, addService, removeService } = useBookingStore();

  const filteredServices = services.filter(
    (service) => selectedCategory === 'all' || service.category === selectedCategory
  );

  const handleServiceSelect = (service: Service) => {
    const isSelected = selectedServices.some((s) => s.id === service.id);
    if (isSelected) {
      removeService(service.id);
    } else {
      addService(service);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Services</h1>
        {selectedServices.length > 0 && (
          <button
            onClick={() => navigate('/book')}
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
          >
            Book Selected ({selectedServices.length})
          </button>
        )}
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={handleServiceSelect}
            selected={selectedServices.some((s) => s.id === service.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;