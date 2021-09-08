import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { Grid, Box, Card, Heading, Paragraph, Button } from 'theme-ui';
import { CartStateContext, CartDispatchContext, addToCart } from '../lib/contexts/cart';

export const ProductCard = ({ product }) => {
  const { items } = useContext(CartStateContext);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CartDispatchContext);
  const { name, prices, description, images } = product;

  const handleAddToCart = (event) => {
    const priceIndex = event.target.value;
    const price = prices[priceIndex];
    addToCart(dispatch, { ...product, price });
    setIsAdded(true);
  };

  useEffect(() => {
    setIsAdded(items.some((cartItem) => cartItem.id === product.id));
  });

  return (
    <Card width={256}>
      {images?.[0] ? <Image src={images[0]} width={200} height={200} /> : ''}
      <Heading>{name}</Heading>
      <Paragraph>{description}</Paragraph>
      <small sx={{ fontWeight: 'bold' }}>Prices</small>
      {prices.map((price, priceIndex) => (
        <div key={price.id}>
          <Paragraph>
            {(price.unit_amount / 100).toFixed(2)} {price.currency.toUpperCase()} / {price.recurring.interval}
          </Paragraph>
          <Button className={!isAdded ? '' : 'added'} type="button" value={priceIndex} onClick={handleAddToCart}>
            {!isAdded ? 'ADD TO CART' : '✔ ADDED'}
          </Button>
        </div>
      ))}
    </Card>
  );
};

export const ProductList = ({ products }) => {
  return (
    <>
      {products.length ? (
        <Grid gap={2} columns={4}>
          {products.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Grid>
      ) : (
        <Paragraph>No products to display!</Paragraph>
      )}
    </>
  );
};
