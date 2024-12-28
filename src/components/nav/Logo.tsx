import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Sparkles className="h-8 w-8 text-purple-600" />
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        LuxeSpa
      </span>
    </Link>
  );
};