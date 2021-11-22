import { useContext } from 'react';
import { mutate } from 'swr';
import Image from 'next/image';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { Flex, Box, Divider, Heading, Close, IconButton, Button, Text, Grid } from 'theme-ui';
import { CartStateContext, CartDispatchContext, removeFromCart, updateCartItem, toggleCart } from 'lib/contexts/cart';
import { post } from 'lib/utils/fetcher';
import getStripe from 'lib/utils/stripe';
import { ProductPrice } from './products';
import { ProductQuantitySelect } from './products';
import { formatPrice } from 'lib/utils/text';

export const CartIcon = () => {
  const { items: cartItems, isCartReady } = useContext(CartStateContext);
  const cartDispatch = useContext(CartDispatchContext);
  const cartQuantity = cartItems.length;

  const handleCartButton = (event) => {
    event.preventDefault();
    return toggleCart(cartDispatch);
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

  console.log(items);

  const dispatch = useContext(CartDispatchContext);

  const cartCurrency = items?.[0]?.price?.currency ?? '';

  const cartTotal = items
    .map((item) => item.price.unitAmount * item.quantity)
    .reduce((prev, current) => prev + current, 0);

  const handleRemove = (itemIndex) => {
    return removeFromCart(dispatch, itemIndex);
  };

  const handleUpdate = (itemIndex, itemPatch) => {
    return updateCartItem(dispatch, itemIndex, itemPatch);
  };

  const handleProceedCheckout = async () => {
    const session = await post('/api/my/checkout', {
      lineItems: items.map((i) => ({
        price: i.price.id,
        quantity: i.quantity
      }))
    });
    const stripe = await getStripe();
    await stripe.redirectToCheckout({
      sessionId: session.id
    });
    mutate('/api/my/subscriptions');
    toggleCart(dispatch);
  };

  const handleCloseButton = (event) => {
    event.preventDefault();
    return toggleCart(dispatch);
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
              <Flex variant="cart.itemList">
                {items.map((product, index) => (
                  <Box variant="cart.item" key={`${product.id}_${index}`}>
                    <Grid variant="cart.itemGrid" gap={2} columns={[3, '0.5fr 2fr 0.5fr']}>
                      <Box>
                        {product.images?.[0] ? (
                          <Image src={product.images?.[0]} width={100} height={100} objectFit="fill" />
                        ) : (
                          ''
                        )}
                      </Box>
                      <Box>
                        <div>
                          <strong>{product.name}</strong>
                        </div>
                        <Grid gap={2} columns={3}>
                          <ProductPrice price={product.price} />
                          <ProductQuantitySelect
                            defaultValue={product.quantity}
                            onChange={(event) => handleUpdate(index, { quantity: Number(event.target.value) })}
                          />
                          <ProductPrice price={product.price} quantity={product.quantity} />
                        </Grid>
                      </Box>
                      <IconButton onClick={() => handleRemove(index)}>
                        <FiTrash2 size={50} />
                      </IconButton>
                    </Grid>
                  </Box>
                ))}
              </Flex>
            </Box>
            <Divider />
            {cartTotal ? (
              <Box sx={{ textAlign: 'center' }}>
                <strong>Subtotal</strong> <span>{formatPrice(cartCurrency, cartTotal)}</span>
              </Box>
            ) : null}
            <Divider />
            <Box>
              <Button disabled={items && items.length === 0} onClick={handleProceedCheckout} sx={{ width: '100%' }}>
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
