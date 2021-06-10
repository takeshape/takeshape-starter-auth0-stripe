import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import Layout from '../components/layout';
import ProfileForm from '../components/profile-form';
import { get } from '../lib/fetcher';

export default withPageAuthRequired(function Account() {
  const { user } = useUser();
  const { data, error } = useSWR('/api/my/profile', get);

  return (
    <Layout>
      <h1>Account</h1>

      <p>
        This page will display your Auth0 user token, your profile information fetched from TakeShape's GraphQL API, and
        a form for making updates to the TakeShape data.
      </p>
      <p>
        You Auth0 claims are stored in an{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies">
          HttpOnly session cookie
        </a>{' '}
        for maximum security.
      </p>
      <p>
        Behind the Next.js API proxy, your Auth0 access token will be sent with your request. TakeShape will
        automatically append information from that token to your GraphQL mutation payload.
      </p>
      <p>
        <strong>
          Try editing your profile and uploading an avatar below. You should see the data update immediately.
        </strong>
      </p>

      <div>
        <h2>Auth0 User Token</h2>
        <hr />
        <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
      </div>

      {!data && <p>Loading TakeShape profile...</p>}

      {data && (
        <div>
          <h2>TakeShape Profile</h2>
          <hr />
          {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <pre>No profile created yet.</pre>}

          <h2>Update TakeShape Profile</h2>
          <hr />
          <ProfileForm profile={data} />
        </div>
      )}

      {error && (
        <>
          <p>Error loading TakeShape profile</p>
          <pre style={{ color: 'red' }}>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
});
