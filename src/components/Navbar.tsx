import React from 'react';
import { Logo } from './nav/Logo';
import { NavLinks } from './nav/NavLinks';
import { AuthNav } from './nav/AuthNav';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <div className="flex items-center space-x-4">
            <NavLinks />
            <AuthNav />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};