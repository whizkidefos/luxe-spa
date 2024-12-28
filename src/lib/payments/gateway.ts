import type { PaymentProvider, PaymentGatewayConfig } from './types';
import { StripeProvider } from './stripe';
import { FlutterwaveProvider } from './flutterwave';

export class PaymentGateway {
  private providers: Map<string, PaymentProvider> = new Map();

  constructor(config: PaymentGatewayConfig) {
    if (config.stripe) {
      this.providers.set('stripe', new StripeProvider());
    }
    if (config.flutterwave) {
      this.providers.set('flutterwave', new FlutterwaveProvider());
    }
  }

  async initialize() {
    await Promise.all(
      Array.from(this.providers.values()).map(provider => provider.initialize())
    );
  }

  getProvider(name: string): PaymentProvider {
    const provider = this.providers.get(name);
    if (!provider) {
      throw new Error(`Payment provider ${name} not found`);
    }
    return provider;
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }
}