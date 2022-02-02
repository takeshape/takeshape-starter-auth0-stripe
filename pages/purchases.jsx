import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Heading, Divider, Alert, Spinner, Container } from '@theme-ui/components';
import { Page, Section } from 'components/layout';
import { SubscriptionList } from 'components/subscriptions';
import { PaymentList } from 'components/payments';
import { useQuery } from '@apollo/client';
import { GetMySubscriptions, GetMyPayments } from 'lib/queries';
import { useProfile } from 'lib/takeshape';

function PurchasesPage() {
  const { isProfileReady } = useProfile();
  const skip = !isProfileReady;
  const { data: subscriptionsData, error: subscriptionsError } = useQuery(GetMySubscriptions, { skip });
  const { data: paymentsData, error: paymentsError } = useQuery(GetMyPayments, { skip });

  return (
    <Page>
      <Heading as="h1">Purchases</Heading>
      <Divider />

      <Section>
        <Heading variant="smallHeading" id="subscriptions">
          Active Subscriptions
        </Heading>
        <Divider />

        {!subscriptionsData && <Spinner />}

        {subscriptionsData && <SubscriptionList subscriptions={subscriptionsData.subscriptions} />}

        {subscriptionsError && (
          <>
            <Alert>Error loading subscriptions</Alert>
            <pre style={{ color: 'red' }}>{JSON.stringify(subscriptionsError, null, 2)}</pre>
          </>
        )}
      </Section>

      <Section>
        <Heading variant="smallHeading" id="payments">
          Past Payments
        </Heading>
        <Divider />

        {!paymentsData && <Spinner />}

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
