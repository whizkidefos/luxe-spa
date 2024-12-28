export interface PaymentProvider {
  name: string;
  initialize: () => Promise<void>;
  createPayment: (amount: number) => Promise<{ clientSecret: string }>;
  processPayment: (clientSecret: string) => Promise<{ success: boolean; error?: string }>;
}

export interface PaymentGatewayConfig {
  stripe?: {
    publicKey: string;
  };
  flutterwave?: {
    publicKey: string;
  };
}