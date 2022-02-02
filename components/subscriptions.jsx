import { Grid, Box, Card, Heading, Paragraph, Text, Alert } from '@theme-ui/components';
import { useMutation } from '@apollo/client';
import { formatPrice } from 'lib/utils/text';
import { DeleteMySubscription, GetMySubscriptions } from 'lib/queries';
import { locale } from 'lib/config';
import { SubmitButton } from './buttons';
import { ProductImage } from './products';

export const SubscriptionItemCard = ({ subscription, subscriptionItem }) => {
  const [setCancelPayload, { error: cancelError, loading: cancelLoading }] = useMutation(DeleteMySubscription, {
    refetchQueries: [GetMySubscriptions],
    awaitRefetchQueries: true
  });

  const { current_period_end: currentPeriodEnd } = subscription;
  const nextBillDate = new Date(currentPeriodEnd * 1000);

  const {
    price: { product, ...price }
  } = subscriptionItem;

  const handleCancelSubscription = () => {
    setCancelPayload({
      variables: { subscriptionId: subscription.id }
    });
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

      {cancelError && (
        <>
          <Alert>Error canceling Stripe subscription</Alert>
          <pre style={{ color: 'red' }}>{JSON.stringify(cancelError, null, 2)}</pre>
        </>
      )}

      <SubmitButton text="Cancel" onClick={handleCancelSubscription} isSubmitting={cancelLoading} />
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
