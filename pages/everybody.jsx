import React, { useEffect } from 'react';
import useApi from '../lib/use-api';
import Layout from '../components/layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function Everybody() {
  const { response, error, isLoading, fetchData } = useApi();

  useEffect(() => {
    fetchData('/api/everybody');
  }, []);

  return (
    <Layout>
      <h1>All TakeShape Profiles</h1>

      {isLoading && <p>Loading TakeShape profiles...</p>}

      {response && (
        <ul>
          {response.profileList.items.map((profile) => {
            return (
              <li>
                <strong>
                  {profile.firstName} {profile.lastName}
                </strong>
                <div>{profile.bio}</div>
              </li>
            );
          })}
        </ul>
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
