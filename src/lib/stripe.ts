import { loadStripe } from '@stripe/stripe-js';

export const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);