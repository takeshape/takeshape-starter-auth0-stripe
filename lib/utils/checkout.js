import { mutate } from 'swr';
import getStripe from './stripe';
import { post } from './fetcher';

export const checkout = async (items, redirectUrl) => {
  const session = await post('/api/my/checkout', {
    lineItems: items.map((i) => ({
      price: i.price.id,
      quantity: i.quantity
    })),
    mode: items.some((i) => i.price.recurring) ? 'subscription' : 'payment',
    redirectUrl
  });
  const stripe = await getStripe();
  await stripe.redirectToCheckout({
    sessionId: session.id
  });
  mutate('/api/my/subscriptions');
};
