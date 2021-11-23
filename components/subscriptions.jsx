import { useState } from 'react';
import { mutate } from 'swr';
import { Grid, Box, Card, Heading, Paragraph, Text } from 'theme-ui';
import { destroy } from 'lib/utils/fetcher';
import { formatPrice } from 'lib/utils/text';
import { locale } from 'lib/config';
import { SubmitButton } from './buttons';
import { ProductImage } from './products';

const cancelSubscription = async (data) => {
  await destroy('/api/my/subscriptions', data);
  await mutate('/api/my/subscriptions');
};

export const SubscriptionItemCard = ({ subscription, subscriptionItem }) => {
  const [canceling, setCanceling] = useState(false);

  const { current_period_end } = subscription;
  const nextBillDate = new Date(current_period_end * 1000);

  const {
    price: { product, ...price }
  } = subscriptionItem;

  const handleCancelSubscription = async (event) => {
    setCanceling(true);
    cancelSubscription({ subscriptionId: subscription.id });
  };

  return (
    <Card>
      <ProductImage images={product.images} />
      <Heading>{product.name}</Heading>
      <Paragraph>
        <Text>
          {formatPrice(price.currency, price.unitAmount)} / {price.recurring?.interval || ''}
        </Text>
      </Paragraph>
      <Paragraph>
        <strong>Next Bill:</strong>{' '}
        <Text>{nextBillDate.toLocaleString(locale, { month: 'long', year: 'numeric', day: 'numeric' })}</Text>
      </Paragraph>

      <SubmitButton text="Cancel" onClick={handleCancelSubscription} isSubmitting={canceling} />
    </Card>
  );
};

export const SubscriptionList = ({ subscriptions }) => {
  return (
    <>
      {subscriptions.length ? (
        <Grid gap={2} columns={3}>
          {subscriptions.map((subscription) => (
            <Box key={subscription.id}>
              {subscription.items?.data?.[0] && (
                <SubscriptionItemCard subscription={subscription} subscriptionItem={subscription.items.data[0]} />
              )}
            </Box>
          ))}
        </Grid>
      ) : (
        <Paragraph>No subscriptions to display!</Paragraph>
      )}
    </>
  );
};
