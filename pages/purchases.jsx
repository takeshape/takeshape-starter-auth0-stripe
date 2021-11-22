import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { Themed, Heading, Divider, Alert } from 'theme-ui';
import { get } from 'lib/utils/fetcher';
import { Page, Section } from 'components/layout';
import { ProfileForm, CustomerForm } from 'components/forms';
import { SubscriptionList } from 'components/subscriptions';

export default withPageAuthRequired(function PurchasesPage() {
  const { data: subscriptions, error: subscriptionsError } = useSWR('/api/my/subscriptions', get);

  return (
    <Page>
      <Themed.h1>Purchases</Themed.h1>
      <Divider />

      <Section>
        <Heading id="subscriptions">Subscriptions</Heading>
        <Divider />

        {!subscriptions && <p>Loading Stripe subscriptions...</p>}

        {subscriptions && <SubscriptionList subscriptions={subscriptions} />}

        {subscriptionsError && (
          <>
            <Alert>Error loading Stripe subscriptions</Alert>
            <pre style={{ color: 'red' }}>{JSON.stringify(subscriptionsError, null, 2)}</pre>
          </>
        )}
      </Section>

      <Section>
        <Heading id="subscriptions">One-Time</Heading>
        <Divider />

        {!subscriptions && <p>Loading Stripe subscriptions...</p>}

        {subscriptions && <SubscriptionList subscriptions={subscriptions} />}

        {subscriptionsError && (
          <>
            <Alert>Error loading Stripe subscriptions</Alert>
            <pre style={{ color: 'red' }}>{JSON.stringify(subscriptionsError, null, 2)}</pre>
          </>
        )}
      </Section>
    </Page>
  );
});
