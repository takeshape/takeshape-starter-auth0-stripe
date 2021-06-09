import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useApi from '../lib/use-api';
import Layout from '../components/layout';

export default function Account({ user }) {
  const { response, error, isLoading } = useApi('/api/my/profile');

  return (
    <Layout>
      <h1>Account (Server Rendered)</h1>

      <div>
        <h4>Auth0 User Token</h4>
        <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
      </div>

      {isLoading && <p>Loading TakeShape profile...</p>}

      {response && (
        <div>
          <h4>TakeShape Profile</h4>
          <pre>{JSON.stringify(response.profile, null, 2)}</pre>
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
