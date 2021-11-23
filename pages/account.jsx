import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { Themed, Heading, Divider, Alert } from 'theme-ui';
import { get } from 'lib/utils/fetcher';
import { Page, Section } from 'components/layout';
import { ProfileForm, CustomerForm } from 'components/forms';

export default withPageAuthRequired(function AccountPage() {
  const { data: profile, error: profileError } = useSWR('/api/my/profile', get);
  const { data: customer, error: customerError } = useSWR('/api/my/customer', get);

  return (
    <Page>
      <Themed.h1>Account</Themed.h1>
      <Divider />

      <Section>
        <Heading>TakeShape Profile</Heading>
        <Divider />

        {!profile && <Heading>Loading TakeShape profile...</Heading>}

        {profile && <ProfileForm profile={profile} />}

        {profileError && (
          <>
            <Alert>Error loading TakeShape profile</Alert>
            <pre style={{ color: 'red' }}>{JSON.stringify(profileError, null, 2)}</pre>
          </>
        )}
      </Section>

      <Section>
        <Heading>Stripe Customer</Heading>
        <Divider />

        {!customer && <p>Loading Stripe customer...</p>}

        {customer && <CustomerForm customer={customer} />}

        {customerError && (
          <>
            <Alert>Error loading Stripe customer</Alert>
            <pre style={{ color: 'red' }}>{JSON.stringify(customerError, null, 2)}</pre>
          </>
        )}
      </Section>
    </Page>
  );
});
