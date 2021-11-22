import { useState, useContext } from 'react';
import Image from 'next/image';
import { Grid, Box, Card, Heading, Paragraph, Button, Select, Label, Radio } from 'theme-ui';
import orderBy from 'lodash/orderBy';
import { CartDispatchContext, addToCart, openCart, toggleCart } from 'lib/contexts/cart';
import { range } from 'lib/utils/range';
import { pluralizeText, formatPrice } from 'lib/utils/text';

const showCartTimeout = 3000;
const oneTimePurchase = 'one-time';
const recurringPurchase = 'recurring';
const intervalOrderMap = ['day', 'week', 'month', 'year'];

export const ProductPrice = ({ price, quantity }) => {
  quantity = quantity ?? 1;

  const recurringText =
    price.recurring &&
    `every ${pluralizeText(price.recurring.intervalCount, price.recurring.interval, `${price.recurring.interval}s`)}`;

  return (
    <Box>
      {formatPrice(price.currency, price.unitAmount * quantity)} {recurringText}
    </Box>
  );
};

export const ProductImage = ({ images }) => {
  return images?.[0] ? <Image src={images[0]} width={300} height={300} objectFit="fill" /> : null;
};

export const ProductPaymentToggle = ({ purchaseType, onChange }) => {
  return (
    <Box>
      <Label>
        <Radio value={oneTimePurchase} checked={purchaseType === oneTimePurchase} onChange={onChange} />
        One-Time Purchase
      </Label>
      <Label>
        <Radio value={recurringPurchase} checked={purchaseType === recurringPurchase} onChange={onChange} />
        Subscribe &amp; Save!
      </Label>
    </Box>
  );
};

export const ProductRecurringSelect = ({ currentPrice, recurringPayments, onChange }) => {
  return (
    <Box>
      Subscription
      <Select value={currentPrice.id} onChange={onChange}>
        {recurringPayments.map(({ id, recurring: { interval, intervalCount } }) => (
          <option key={id} value={id}>
            Every {pluralizeText(intervalCount, interval, `${interval}s`)}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export const ProductQuantitySelect = ({ defaultValue, onChange }) => {
  return (
    <Box variant="product.quantity">
      <Select defaultValue={defaultValue ?? 1} onChange={onChange}>
        {range(10).map((num) => (
          <option key={num} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export const ProductCard = ({ product }) => {
  const { name, prices, description, images } = product;

  const cartDispatch = useContext(CartDispatchContext);

  if (!prices.length) {
    return null;
  }

  const oneTimePayment = prices.find((p) => !p.recurring);
  const recurringPayments = orderBy(
    prices.filter((p) => p.recurring),
    [(v) => intervalOrderMap.indexOf(v.recurring.interval), 'recurring.intervalCount'],
    ['asc', 'asc']
  );

  const [purchaseType, setPurchaseType] = useState(oneTimePayment ? oneTimePurchase : recurringPurchase);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(oneTimePayment ? oneTimePayment : recurringPayments[0]);

  const findPriceById = (priceId) => prices.find((p) => p.id === priceId);

  const handleUpdatePurchaseType = (event) => {
    const { value } = event.target;

    setPurchaseType(value);

    if (value === oneTimePurchase) {
      setPrice(oneTimePayment);
    }

    if (value === recurringPurchase) {
      setPrice(recurringPayments[0]);
    }
  };

  const handleUpdateQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleUpdateRecurring = (event) => {
    setPurchaseType(recurringPurchase);
    setPrice(findPriceById(event.target.value));
  };

  const handleAddToCart = () => {
    addToCart(cartDispatch, { ...product, price, quantity });
    openCart(cartDispatch);
    setTimeout(() => toggleCart(cartDispatch), showCartTimeout);
  };

  return (
    <Card>
      <ProductImage images={images} />

      <Heading>{name}</Heading>
      <Paragraph>{description}</Paragraph>

      <ProductPrice price={price} />

      {oneTimePayment && recurringPayments.length && (
        <ProductPaymentToggle purchaseType={purchaseType} onChange={handleUpdatePurchaseType} />
      )}

      {recurringPayments.length && (
        <ProductRecurringSelect
          currentPrice={price}
          recurringPayments={recurringPayments}
          onChange={handleUpdateRecurring}
        />
      )}

      <Box>Quantity</Box>
      <Grid columns={[2]}>
        <ProductQuantitySelect onChange={handleUpdateQuantity} />
        <Button type="button" onClick={handleAddToCart}>
          <small>ADD TO CART</small>
        </Button>
      </Grid>
    </Card>
  );
};

export const ProductList = ({ products }) => {
  return (
    <>
      {products.length ? (
        <Grid gap={2} columns={3}>
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
