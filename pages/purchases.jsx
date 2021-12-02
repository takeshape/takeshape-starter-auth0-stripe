import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Themed, Heading, Divider, Alert, Spinner, Container } from 'theme-ui';
import { Page, Section } from 'components/layout';
import { SubscriptionList } from 'components/subscriptions';
import { PaymentList } from 'components/payments';
import { useQuery } from '@apollo/client';
import { GetMySubscriptions, GetMyPayments } from 'lib/queries';

function PurchasesPage() {
  const { data: subscriptionsData, error: subscriptionsError } = useQuery(GetMySubscriptions);
  const { data: paymentsData, error: paymentsError } = useQuery(GetMyPayments);

  return (
    <Page>
      <Themed.h1>Purchases</Themed.h1>
      <Divider />

      <Section>
        <Heading id="subscriptions">Active Subscriptions</Heading>
        <Divider />

        {!subscriptionsData && (
          <Container variant="layout.loading">
            <Spinner />
          </Container>
        )}

        {subscriptionsData && <SubscriptionList subscriptions={subscriptionsData.subscriptions} />}

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

        {!paymentsData && (
          <Container variant="layout.loading">
            <Spinner />
          </Container>
        )}

        {paymentsData && <PaymentList payments={paymentsData.payments} />}

        {paymentsError && (
          <>
            <Alert>Error loading payments</Alert>
            <pre style={{ color: 'red' }}>{JSON.stringify(paymentsError, null, 2)}</pre>
          </>
        )}
      </Section>
    </Page>
  );
}

export default withAuthenticationRequired(PurchasesPage, {
  onRedirecting: () => (
    <Container variant="layout.loading">
      <Spinner />
    </Container>
  )
});
