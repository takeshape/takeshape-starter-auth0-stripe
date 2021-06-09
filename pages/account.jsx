import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR, { mutate } from 'swr';
import Layout from '../components/layout';
import ProfileForm from '../components/profile-form';
import { get, post } from '../lib/fetcher';
import { updateProfile } from '../lib/update-profile';

export default withPageAuthRequired(function Account() {
  const { user } = useUser();
  const { data, error } = useSWR('/api/my/profile', get);

  return (
    <Layout>
      <h1>Account</h1>

      <div>
        <h4>Auth0 User Token</h4>
        <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
      </div>

      {!data && <p>Loading TakeShape profile...</p>}

      {data && (
        <div>
          <h4>TakeShape Profile</h4>
          <pre>{JSON.stringify(data.profile, null, 2)}</pre>

          <h4>Update TakeShape Profile</h4>
          <ProfileForm profile={data.profile} updateProfile={updateProfile} />
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
