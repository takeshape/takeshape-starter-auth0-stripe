import { useEffect } from 'react';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { Flex, Box, Divider, Heading, Close, IconButton, Button, Text, Grid, Image } from '@theme-ui/components';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';
import { formatPrice } from 'lib/utils/text';
import { getCheckoutPayload } from 'lib/utils/checkout';
import { CreateMyCheckoutSession } from 'lib/queries';
import { useCart } from 'lib/cart';
import getStripe from 'lib/utils/stripe';
import { ProductPrice, ProductQuantitySelect } from './products';

export const CartIcon = () => {
  const {
    items,
    isCartReady,
    actions: { toggleCart }
  } = useCart();

  const cartQuantity = items.reduce((q, i) => q + i.quantity, 0);

  const handleCartButton = (event) => {
    event.preventDefault();
    toggleCart();
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

const CartItem = ({ product, onChangeQuantity, onClickRemove }) => {
  return (
    <Box variant="cart.item">
      <Grid variant="cart.itemGrid" gap={2} columns={[3, '0.5fr 2fr 0.5fr']}>
        <Box>
          {product.images?.[0] ? (
            <Image
              alt={`Image of ${product.name}`}
              src={product.images?.[0]}
              width={100}
              height={100}
              objectFit="fill"
            />
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
            <ProductQuantitySelect defaultValue={product.quantity} onChange={onChangeQuantity} />
            <ProductPrice price={product.price} quantity={product.quantity} />
          </Grid>
        </Box>
        <IconButton onClick={onClickRemove}>
          <FiTrash2 size={50} />
        </IconButton>
      </Grid>
    </Box>
  );
};

export const CartSidebar = () => {
  const {
    items,
    isCartOpen,
    isCartReady,
    actions: { removeFromCart, updateCartItem, toggleCart }
  } = useCart();

  const { user, loginWithRedirect } = useAuth0();
  const [setCheckoutPayload, { data: checkoutData }] = useMutation(CreateMyCheckoutSession);
  const cartCurrency = items?.[0]?.price?.currency ?? '';

  const cartTotal = items
    .map((item) => item.price.unitAmount * item.quantity)
    .reduce((prev, current) => prev + current, 0);

  const handleRemove = (itemIndex) => {
    removeFromCart(itemIndex);
  };

  const handleUpdate = (itemIndex, itemPatch) => {
    updateCartItem(itemIndex, itemPatch);
  };

  const handleCheckout = async () => {
    if (!user) {
      loginWithRedirect({ appState: { returnTo: '/_checkout' } });
      return;
    }
    setCheckoutPayload({
      variables: getCheckoutPayload(items, window.location.href)
    });
  };

  useEffect(() => {
    const doCheckout = async () => {
      const stripe = await getStripe();
      stripe.redirectToCheckout({
        sessionId: checkoutData.session.id
      });
    };
    if (checkoutData?.session) {
      doCheckout();
    }
  }, [checkoutData]);

  const handleCloseButton = (event) => {
    event.preventDefault();
    toggleCart();
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
                  <CartItem
                    key={`${product.id}_${index}`}
                    product={product}
                    onChangeQuantity={(event) => handleUpdate(index, { quantity: Number(event.target.value) })}
                    onClickRemove={() => handleRemove(index)}
                  />
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
              <Button disabled={items && items.length === 0} onClick={handleCheckout} sx={{ width: '100%' }}>
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
