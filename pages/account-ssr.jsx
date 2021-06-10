import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '../components/layout';
import ProfileForm from '../components/profile-form';
import useSWR from 'swr';
import { get } from '../lib/fetcher';

export default function Account({ user }) {
  const { data, error } = useSWR('/api/my/profile', get);

  return (
    <Layout>
      <h1>Account (Server Rendered)</h1>

      <p>
        This page will display your Auth0 user token, your profile information fetched from TakeShape's GraphQL API, and
        a form for making updates to the TakeShape data.
      </p>

      <p>
        Similar to <a href="/account">/account</a> but leveraging the Next.js SSR approach.
      </p>

      <div>
        <h4>Auth0 User Token</h4>
        <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
      </div>

      {!data && <p>Loading TakeShape profile...</p>}

      {data && (
        <div>
          <h4>TakeShape Profile</h4>
          {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <pre>No profile created yet.</pre>}

          <h4>TakeShape Profile</h4>
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
}

export const getServerSideProps = withPageAuthRequired();
