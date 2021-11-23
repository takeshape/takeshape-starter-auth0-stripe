import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { Themed, Heading, Divider, Alert } from 'theme-ui';
import { get } from 'lib/utils/fetcher';
import { Page, Section } from 'components/layout';
import { SubscriptionList } from 'components/subscriptions';
import { InvoiceList } from 'components/invoices';

export default withPageAuthRequired(function PurchasesPage() {
  const { data: subscriptions, error: subscriptionsError } = useSWR('/api/my/subscriptions', get);
  const { data: invoices, error: invoicesError } = useSWR('/api/my/invoices', get);

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
        <Heading id="invoices">Past Invoices</Heading>
        <Divider />

        {!invoices && <p>Loading invoices...</p>}

        {invoices && <InvoiceList invoices={invoices} />}

        {invoicesError && (
          <>
            <Alert>Error loading invoices</Alert>
            <pre style={{ color: 'red' }}>{JSON.stringify(invoicesError, null, 2)}</pre>
          </>
        )}
      </Section>
    </Page>
  );
});
