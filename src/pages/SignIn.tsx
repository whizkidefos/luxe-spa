import React from 'react';
import { Link } from 'react-router-dom';
import { AuthForm } from '../components/auth/AuthForm';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md mx-auto">
        <AuthForm mode="signin" />
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:text-purple-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;