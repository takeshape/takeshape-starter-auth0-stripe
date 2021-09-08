import { useContext, useEffect, useState } from 'react';
import { Box, Alert, Close } from 'theme-ui';
import { CartDispatchContext, CartStateContext, clearCheckoutResult } from '../lib/contexts/cart';

const Notifications = () => {
  const [state, setState] = useState({ visible: false, fade: true });

  const dispatch = useContext(CartDispatchContext);
  const { checkoutResult } = useContext(CartStateContext);

  let stateTimeout;
  let resultTimeout;

  const handleClose = () => {
    if (stateTimeout) {
      clearTimeout(stateTimeout);
    }
    if (resultTimeout) {
      clearTimeout(resultTimeout);
    }

    setState({ visible: false, fade: false });
    clearCheckoutResult(dispatch);
  };

  useEffect(() => {
    if (checkoutResult) {
      setState({ visible: true, fade: true });
      stateTimeout = setTimeout(() => setState({ visible: false, fade: true }), 5000);
      resultTimeout = setTimeout(() => clearCheckoutResult(dispatch), 5500);
    }
  }, [checkoutResult]);

  let message;

  if (checkoutResult === 'success') {
    message = 'Successfully checked out, your cart has been cleared.';
  }

  if (checkoutResult === 'canceled') {
    message = 'Checkout canceled, your cart has been saved.';
  }

  return (
    <Box
      as="aside"
      variant="layout.snackbar"
      style={{
        opacity: state.visible ? 1 : 0,
        transition: state.fade ? `opacity 0.4s ease-in-out` : ''
      }}
    >
      <Alert variant="secondary">
        {message} <Close ml="auto" mr={-2} onClick={handleClose} />
      </Alert>
    </Box>
  );
};

export default Notifications;
