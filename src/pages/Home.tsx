import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkle } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Luxury Wellness & Beauty
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Experience the perfect blend of relaxation and rejuvenation
            </p>
            <Link
              to="/book"
              className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Massage Therapy',
              icon: '💆‍♀️',
              description: 'Relax and rejuvenate with our therapeutic massages',
            },
            {
              title: 'Facial Treatments',
              icon: '✨',
              description: 'Revitalize your skin with our premium facials',
            },
            {
              title: 'Nail Care',
              icon: '💅',
              description: 'Professional nail care and artistic designs',
            },
            {
              title: 'Beauty Services',
              icon: '👑',
              description: 'Complete beauty treatments for any occasion',
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:transform hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Treat Yourself?</h2>
          <p className="text-xl mb-8">
            Book your appointment today and experience luxury wellness
          </p>
          <Link
            to="/services"
            className="inline-flex items-center bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Sparkle className="mr-2" />
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;