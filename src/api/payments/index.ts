import { createPaymentIntent } from './stripe';
import { initializePayment } from './flutterwave';

export const paymentsApi = {
  stripe: { createPaymentIntent },
  flutterwave: { initializePayment },
};