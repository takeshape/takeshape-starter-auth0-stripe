import { useContext } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { checkout } from 'lib/utils/checkout';
import { CartStateContext } from 'lib/contexts/cart';

export default withPageAuthRequired(function _CheckoutPage() {
  const { items } = useContext(CartStateContext);
  checkout(items, '/purchases');
  return null;
});
