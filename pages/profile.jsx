import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

import Layout from '../components/layout';

export default withPageAuthRequired(function Profile() {
  const { user } = useUser();
  return (
    <Layout>
      <h1>Profile</h1>

      <div>
        <h4>Profile</h4>
        <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
      </div>
    </Layout>
  );
});
