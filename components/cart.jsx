/** @jsxImportSource theme-ui */
import { useContext } from 'react';
import { mutate } from 'swr';
import Image from 'next/image';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { Flex, Box, Divider, Heading, Close, IconButton, Button, Text, Grid } from 'theme-ui';
import { CartStateContext, CartDispatchContext, removeFromCart, toggleCartPopup } from '../lib/contexts/cart';
import { post } from '../lib/utils/fetcher';
import getStripe from '../lib/utils/stripe';

export const CartIcon = () => {
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

export const CartSidebar = () => {
  const { items, isCartOpen, isCartReady } = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);

  const cartCurrent = items?.[0]?.price?.currency ?? '';
  const cartInterval = items?.[0]?.price?.recurring?.interval ?? '';

  const cartTotal = items.map((item) => item.price.unit_amount).reduce((prev, current) => prev + current, 0);

  const handleRemove = (productId) => {
    return removeFromCart(dispatch, productId);
  };

  const handleProceedCheckout = async () => {
    const session = await post('/api/my/checkout', { lineItems: [{ price: items[0].price.id, quantity: 1 }] });
    const stripe = await getStripe();
    await stripe.redirectToCheckout({
      sessionId: session.id
    });
    mutate('/api/my/subscriptions');
    toggleCartPopup(dispatch);
  };

  const handleCloseButton = (event) => {
    event.preventDefault();
    return toggleCartPopup(dispatch);
  };

  return (
    <Box as="aside">
      {isCartReady ? (
        <Flex
          style={{
            transform: isCartOpen ? 'translateX(0)' : 'translateX(103%)'
          }}
          variant="layout.cart"
        >
          <Flex>
            <Close sx={{ ml: 'auto' }} onClick={handleCloseButton} />
          </Flex>
          <Flex sx={{ flexDirection: 'column', flex: '1 1 auto' }}>
            <Heading sx={{ textAlign: 'center' }}>Your Cart</Heading>
            <Divider />
            <Box>
              <Flex sx={{ flexDirection: 'column' }}>
                {items.map((product) => (
                  <Box key={product.name}>
                    <Grid gap={2} columns={[3, '1fr 2fr 0.5fr']} sx={{ alignItems: 'center' }}>
                      <Box>
                        {product.images?.[0] ? <Image src={product.images?.[0]} width={100} height={100} /> : ''}
                      </Box>
                      <Box>
                        <div>
                          <strong>{product.name}</strong>
                        </div>
                        <Text>
                          {(product.price.unit_amount / 100).toFixed(2)} {product.price.currency.toUpperCase()} /{' '}
                          {product.price.recurring?.interval || ''}
                        </Text>
                      </Box>
                      <IconButton onClick={() => handleRemove(product.id)}>
                        <FiTrash2 size={50} />
                      </IconButton>
                    </Grid>
                  </Box>
                ))}
              </Flex>
            </Box>
            <Divider />
            <Box sx={{ textAlign: 'center' }}>
              <strong>Subtotal</strong>{' '}
              <span>
                {Math.floor(cartTotal / 100).toFixed(2)} {cartCurrent.toUpperCase()} / {cartInterval}
              </span>
            </Box>
            <Divider />
            <Box>
              <Button
                variant={items && items.length === 0 ? 'disabled' : ''}
                disabled={items && items.length === 0}
                onClick={handleProceedCheckout}
                sx={{ width: '100%' }}
              >
                Checkout Now
              </Button>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Heading>Cart is loading...</Heading>
      )}
    </Box>
  );
};

export default CartSidebar;
