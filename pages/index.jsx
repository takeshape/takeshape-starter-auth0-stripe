import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

import Layout from '../components/layout';

export default function HomePage() {
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
        <div>
          <h2>Congratulations {user.name || user.email}! You've logged in. 🎉</h2>
          <p>
            When you signed in a TakeShape profile was automatically created for you using identifying details from your
            Auth0 user token.
          </p>
          <p>
            Now head over to the <Link href="/account">account</Link> page and update your profile.
          </p>
        </div>
      )}

      {!isLoading && !error && !user && (
        <>
          <h4>
            Before you proceed follow the instructions in the{' '}
            <a target="_blank" href="https://github.com/takeshape/takeshape-starter-auth0/">
              README
            </a>
            .
          </h4>

          <p>
            To test the login click <a href="/api/auth/login">Login</a> here or in the header.
          </p>
          <p>
            Once you are logged in you will be able to view protected account URLs and update your profile in TakeShape.
          </p>
        </>
      )}
    </Layout>
  );
}
