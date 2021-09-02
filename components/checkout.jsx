import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { CartDispatchContext, clearCart } from '../lib/contexts/cart';

const CheckoutSideEffects = () => {
  const {
    query: { stripe_checkout_action: action }
  } = useRouter();

  const dispatch = useContext(CartDispatchContext);

  useEffect(() => {
    if (action === 'canceled') {
      console.log('IT WAS CANCELED');
    }

    if (action === 'success') {
      console.log('IT WAS A SUCCESS');
      //   clearCart(dispatch);
    }
  }, [action]);
};

export default CheckoutSideEffects;
