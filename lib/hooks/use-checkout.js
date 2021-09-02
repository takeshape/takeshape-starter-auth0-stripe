import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { CartDispatchContext, clearCart } from '../contexts/cart';

function useCheckout() {
  const {
    query: { stripe_checkout_action: action }
  } = useRouter();

  const dispatch = useContext(CartDispatchContext);

  useEffect(() => {
    if (action === 'success') {
      clearCart(dispatch);
    }
  }, [action, dispatch]);
}

export default useCheckout;
