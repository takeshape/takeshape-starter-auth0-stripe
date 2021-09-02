/** @jsxImportSource theme-ui */
import { useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Flex, IconButton, Text } from 'theme-ui';
import { CartStateContext, CartDispatchContext, toggleCartPopup } from '../lib/contexts/cart';

const Cart = () => {
  const { items: cartItems, isCartReady } = useContext(CartStateContext);
  const cartDispatch = useContext(CartDispatchContext);
  const cartQuantity = cartItems.length;

  const handleCartButton = (event) => {
    event.preventDefault();
    return toggleCartPopup(cartDispatch);
  };

  return (
    <>
      {isCartReady ? (
        <Flex sx={{ alignItems: 'center' }}>
          <IconButton aria-label="Toggle cart preview" onClick={handleCartButton}>
            <FiShoppingCart size={25} alt="Cart icon" />
          </IconButton>
          <Text as="div" sx={{ width: '1rem', textAlign: 'center' }}>
            {cartQuantity ? cartQuantity : ''}
          </Text>
        </Flex>
      ) : (
        ''
      )}
    </>
  );
};
export default Cart;
