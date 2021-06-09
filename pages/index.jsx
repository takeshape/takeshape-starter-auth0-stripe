import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import Layout from '../components/layout';

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <Layout>
      <h1>TakeShape Starter for Auth0</h1>

      {isLoading && <p>Loading login...</p>}

      {error && (
        <>
          <h4>Error</h4>
          <pre>{error.message}</pre>
        </>
      )}

      {user && (
        <>
          <h4>User info from Auth0</h4>
          <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      {!isLoading && !error && !user && (
        <>
          <h4>
            Before you proceed follow the instructions in the{' '}
            <a href="https://github.com/takeshape/takeshape-starter-auth0/">readme</a>
          </h4>

          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you are logged in you will be able to view protected profile URLs and update your profile in TakeShape.
          </p>
        </>
      )}
    </Layout>
  );
}
