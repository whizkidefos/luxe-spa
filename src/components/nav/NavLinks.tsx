import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const NavLinks = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center space-x-4">
      <Link
        to="/services"
        className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
      >
        Services
      </Link>
      {user && (
        <>
          <Link
            to="/book"
            className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
          >
            Book Now
          </Link>
          <Link
            to="/appointments"
            className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
          >
            My Appointments
          </Link>
        </>
      )}
    </div>
  );
};