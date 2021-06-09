import React from 'react';
import Layout from '../components/layout';
import useSWR from 'swr';
import { get } from '../lib/fetcher';

const baseUrl = process.env.AUTH0_BASE_URL;

export default function Everybody({ data: initialData }) {
  const { data, error } = useSWR('/api/everybody', get, { initialData });

  return (
    <Layout>
      <h1>All TakeShape Profiles (SSR)</h1>

      {!data && <p>Loading TakeShape profiles...</p>}

      {data && (
        <ul>
          {data.profileList.items.map((profile) => {
            return (
              <li key={profile._id}>
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
}

export async function getServerSideProps() {
  const data = await get(`${baseUrl}/api/everybody`);
  return { props: { data } };
}
