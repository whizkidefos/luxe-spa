export const initializePayment = async (amount: number) => {
  const response = await fetch('https://api.flutterwave.com/v3/payments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tx_ref: `tx-${Date.now()}`,
      amount,
      currency: 'USD',
      payment_options: 'card,ussd',
      redirect_url: `${window.location.origin}/appointments`,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to initialize payment');
  }

  const data = await response.json();
  return { clientSecret: data.data.link };
};