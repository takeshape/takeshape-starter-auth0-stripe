import { useState } from 'react';
import {
  Grid,
  Box,
  Card,
  Heading,
  Paragraph,
  Button,
  Select,
  Label,
  Radio,
  AspectImage,
  Flex
} from '@theme-ui/components';
import orderBy from 'lodash/orderBy';
import { range } from 'lib/utils/range';
import { pluralizeText, formatPrice } from 'lib/utils/text';
import { useCart } from 'lib/cart';

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
    <Box sx={{ fontWeight: 'bold' }}>
      {formatPrice(price.currency, price.unitAmount * quantity)} {recurringText}
    </Box>
  );
};

export const ProductImage = ({ images }) => {
  return images?.[0] ? <AspectImage src={images[0]} ratio={1} /> : null;
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
  const {
    isCartOpen,
    actions: { addToCart, openCart, toggleCart }
  } = useCart();

  const { name, prices, description, images } = product;

  const oneTimePayment = prices?.find((p) => !p.recurring);
  const recurringPayments = orderBy(
    prices?.filter((p) => p.recurring),
    [(v) => intervalOrderMap.indexOf(v.recurring.interval), 'recurring.intervalCount'],
    ['asc', 'asc']
  );

  const [purchaseType, setPurchaseType] = useState(oneTimePayment ? oneTimePurchase : recurringPurchase);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(oneTimePayment ? oneTimePayment : recurringPayments?.[0]);

  if (!prices.length) {
    return null;
  }

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
    addToCart({ ...product, price, quantity });

    if (!isCartOpen) {
      openCart();
      setTimeout(() => toggleCart(), showCartTimeout);
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Flex sx={{ height: '100%', flexDirection: 'column' }}>
        <Box>
          <ProductImage images={images} />
        </Box>
        <Box>
          <Heading>{name}</Heading>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Paragraph>{description}</Paragraph>
        </Box>
        <Box>
          <ProductPrice price={price} />

          {oneTimePayment && recurringPayments.length ? (
            <ProductPaymentToggle purchaseType={purchaseType} onChange={handleUpdatePurchaseType} />
          ) : null}

          {recurringPayments.length ? (
            <ProductRecurringSelect
              currentPrice={price}
              recurringPayments={recurringPayments}
              onChange={handleUpdateRecurring}
            />
          ) : null}

          <Box>Quantity</Box>
          <Grid columns={[2]}>
            <ProductQuantitySelect onChange={handleUpdateQuantity} />
            <Button type="button" onClick={handleAddToCart}>
              <small>ADD TO CART</small>
            </Button>
          </Grid>
        </Box>
      </Flex>
    </Card>
  );
};

export const ProductList = ({ products }) => {
  return (
    <>
      {products.length ? (
        <Grid gap={2} columns={3} sx={{ gridAutoRows: '1fr' }}>
          {products.map((product) => (
            <Box key={product.id} sx={{ height: '100%' }}>
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
