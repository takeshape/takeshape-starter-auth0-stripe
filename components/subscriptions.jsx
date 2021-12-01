import { useState } from 'react';
import { Grid, Box, Card, Heading, Paragraph, Text } from 'theme-ui';
import { formatPrice } from 'lib/utils/text';
import { locale } from 'lib/config';
import { SubmitButton } from './buttons';
import { ProductImage } from './products';
import { useMutation } from 'lib/hooks/use-takeshape';

export const SubscriptionItemCard = ({ subscription, subscriptionItem }) => {
  const [canceling, setCanceling] = useState(false);
  const [{ error: deleteError }, setDeletePayload] = useMutation('DeleteMySubscription', {
    revalidateQueryName: 'GetMySubscriptions'
  });

  const { current_period_end } = subscription;
  const nextBillDate = new Date(current_period_end * 1000);

  const {
    price: { product, ...price }
  } = subscriptionItem;

  const handleCancelSubscription = () => {
    setCanceling(true);
    setDeletePayload({ subscriptionId: subscription.id });
  };

  if (deleteError) {
    setCanceling(false);
  }

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

      {deleteError && (
        <>
          <Alert>Error deleting Stripe subscription</Alert>
          <pre style={{ color: 'red' }}>{JSON.stringify(deleteError, null, 2)}</pre>
        </>
      )}

      <SubmitButton text="Cancel" onClick={handleCancelSubscription} isSubmitting={canceling} />
    </Card>
  );
};

export const SubscriptionList = ({ subscriptions }) => {
  return (
    <>
      {subscriptions && subscriptions.length ? (
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
