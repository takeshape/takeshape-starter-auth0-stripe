import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { Themed, Heading, Divider, Alert } from 'theme-ui';
import { get } from 'lib/utils/fetcher';
import { Page, Section } from 'components/layout';
import { SubscriptionList } from 'components/subscriptions';
import { PaymentList } from 'components/payments';

export default withPageAuthRequired(function PurchasesPage() {
  const { data: subscriptions, error: subscriptionsError } = useSWR('/api/my/subscriptions', get);
  const { data: payments, error: paymentsError } = useSWR('/api/my/payments', get);

  return (
    <Page>
      <Themed.h1>Purchases</Themed.h1>
      <Divider />

      <Section>
        <Heading id="subscriptions">Active Subscriptions</Heading>
        <Divider />

        {!subscriptions && <p>Loading subscriptions...</p>}

        {subscriptions && <SubscriptionList subscriptions={subscriptions} />}

        {subscriptionsError && (
          <>
            <Alert>Error loading subscriptions</Alert>
            <pre style={{ color: 'red' }}>{JSON.stringify(subscriptionsError, null, 2)}</pre>
          </>
        )}
      </Section>

      <Section>
        <Heading id="payments">Past Payments</Heading>
        <Divider />

        {!payments && <p>Loading payments...</p>}

        {payments && <PaymentList payments={payments} />}

        {paymentsError && (
          <>
            <Alert>Error loading payments</Alert>
            <pre style={{ color: 'red' }}>{JSON.stringify(paymentsError, null, 2)}</pre>
          </>
        )}
      </Section>
    </Page>
  );
});
