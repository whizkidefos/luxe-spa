import React from 'react';
import type { Service } from '../types';

interface CategoryFilterProps {
  selectedCategory: Service['category'] | 'all';
  onCategoryChange: (category: Service['category'] | 'all') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'massage', label: 'Massage' },
    { id: 'facial', label: 'Facial' },
    { id: 'nails', label: 'Nails' },
    { id: 'beauty', label: 'Beauty' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id as Service['category'] | 'all')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedCategory === category.id
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};