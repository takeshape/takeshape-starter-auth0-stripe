import React from 'react';
import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '../components/layout';
import ProfileForm from '../components/profile-form';
import useSWR from 'swr';
import { get } from '../lib/fetcher';

export default function AccountPageSSR({ user }) {
  const { data, error } = useSWR('/api/my/profile', get);

  return (
    <Layout>
      <h1>Account (Server Rendered)</h1>

      <p>
        Similar to <Link href="/account">/account</Link> but leveraging the Next.js SSR approach.
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
}

export const getServerSideProps = withPageAuthRequired();
