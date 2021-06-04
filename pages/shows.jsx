import React from 'react';

import useApi from '../lib/use-api';
import Layout from '../components/layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function TvShows() {
  const { response, error, isLoading } = useApi('/api/shows');

  return (
    <Layout>
      <h1>TV Shows</h1>

      {isLoading && <p>Loading TV shows...</p>}

      {response && (
        <>
          <p>My favourite TV shows:</p>
          <pre>{JSON.stringify(response.profile, null, 2)}</pre>
        </>
      )}

      {error && (
        <>
          <p>Error loading TV shows</p>
          <pre style={{ color: 'red' }}>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
});
