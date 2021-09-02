import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { Themed, Paragraph, Heading, Link, Divider, Alert } from 'theme-ui';
import { get } from '../lib/utils/fetcher';
import Layout from '../components/layout';
import ProfileForm from '../components/profile-form';
import CustomerForm from '../components/customer-form';

function getCheckoutResultAction() {
  if (typeof window !== 'undefined') {
    const query = new URLSearchParams(window.location.search);
    return query.get('action');
  }
}

export default withPageAuthRequired(function AccountPage() {
  const { user } = useUser();

  const { data: profile, error: profileError } = useSWR('/api/my/profile', get);
  const { data: subscriptions, error: subscriptionsError } = useSWR('/api/my/subscriptions', get);
  const { data: customer, error: customerError } = useSWR('/api/my/customer', get);

  const action = getCheckoutResultAction();
  console.log(action);

  return (
    <Layout>
      <Themed.h1>Account</Themed.h1>

      <Paragraph>
        This page will display your Auth0 user token, your profile information fetched from TakeShape's GraphQL API, and
        a form for making updates to the TakeShape data.
      </Paragraph>
      <Paragraph>
        You Auth0 claims are stored in an{' '}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies">
          HttpOnly session cookie
        </Link>{' '}
        for maximum security.
      </Paragraph>
      <Paragraph>
        Behind the Next.js API proxy, your Auth0 access token will be sent with your request. TakeShape will
        automatically append information from that token to your GraphQL mutation payload.
      </Paragraph>
      <Paragraph>
        <strong>
          Try editing your profile and uploading an avatar below. You should see the data update immediately.
        </strong>
      </Paragraph>

      <>
        <Heading>Auth0 User Token</Heading>
        <Divider />
        <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
      </>

      {!profile && <Heading>Loading TakeShape profile...</Heading>}

      {profile && (
        <>
          <Heading>TakeShape Profile</Heading>
          <Divider />
          {profile ? <pre>{JSON.stringify(profile, null, 2)}</pre> : <pre>No profile created yet.</pre>}

          <Heading>Update TakeShape Profile</Heading>
          <Divider />
          <ProfileForm profile={profile} />
        </>
      )}

      {profileError && (
        <>
          <Alert>Error loading TakeShape profile</Alert>
          <pre style={{ color: 'red' }}>{JSON.stringify(profileError, null, 2)}</pre>
        </>
      )}

      {!customer && <p>Loading Stripe customer...</p>}

      {customer && (
        <>
          <Heading>Stripe Customer</Heading>
          <Divider />
          {customer ? <pre>{JSON.stringify(customer, null, 2)}</pre> : <pre>No customer created yet.</pre>}

          <Heading>Update Stripe Customer</Heading>
          <Divider />
          <CustomerForm customer={customer} />
        </>
      )}

      {customerError && (
        <>
          <Alert>Error loading Stripe customer</Alert>
          <pre style={{ color: 'red' }}>{JSON.stringify(customerError, null, 2)}</pre>
        </>
      )}

      {!subscriptions && <p>Loading Stripe subscriptions...</p>}

      {subscriptions && (
        <>
          <Heading>Stripe Subscriptions</Heading>
          <Divider />

          {subscriptions.length ? (
            <ul>
              {subscriptions.map((subscription) => (
                <li key={subscription.id}>
                  {subscription.items.data.map((item) => (
                    <div key={item.id}>
                      <div>{item.price.product.name}</div>
                      <div>
                        {(item.price.unit_amount / 100).toFixed(2)} {item.price.currency.toUpperCase()} /{' '}
                        {item.price.recurring.interval}
                      </div>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <span>No subscriptions to display!</span>
          )}
        </>
      )}

      {subscriptionsError && (
        <>
          <Alert>Error loading Stripe subscriptions</Alert>
          <pre style={{ color: 'red' }}>{JSON.stringify(subscriptionsError, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
});
