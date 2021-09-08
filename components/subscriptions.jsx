/** @jsxImportSource theme-ui */
import { useState } from 'react';
import Image from 'next/image';
import { mutate } from 'swr';
import { Grid, Box, Card, Heading, Paragraph, Text } from 'theme-ui';
import { destroy } from '../lib/utils/fetcher';
import { SubmitButton } from './buttons';

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
    await cancelSubscription({ subscriptionId: subscription.id });
    setCanceling(false);
  };

  return (
    <Card width={256}>
      {product.images?.[0] ? <Image src={product.images[0]} width={200} height={200} /> : ''}
      <Heading>{product.name}</Heading>
      <Paragraph>
        <Text>
          {(price.unit_amount / 100).toFixed(2)} {price.currency.toUpperCase()} / {price.recurring.interval}
        </Text>
      </Paragraph>
      <Paragraph>
        <strong>Next Bill:</strong>{' '}
        <Text>{nextBillDate.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</Text>
      </Paragraph>

      <SubmitButton text="Cancel" onClick={handleCancelSubscription} isSubmitting={canceling} />
    </Card>
  );
};

export const SubscriptionList = ({ subscriptions }) => {
  return (
    <>
      {subscriptions.length ? (
        <Grid gap={2} columns={4}>
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
