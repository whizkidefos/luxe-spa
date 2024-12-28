import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const AuthNav = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  if (!user) {
    return (
      <button
        onClick={() => navigate('/signin')}
        className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
      >
        Sign In
      </button>
    );
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
    >
      <LogOut className="w-4 h-4" />
      <span>Sign Out</span>
    </button>
  );
};