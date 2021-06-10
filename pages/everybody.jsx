import React from 'react';
import Layout from '../components/layout';
import useSWR from 'swr';
import { get } from '../lib/fetcher';
import { buildImageUrl } from '../lib/images';

const baseUrl = process.env.AUTH0_BASE_URL;

export default function Everybody({ data: initialData }) {
  const { data, error } = useSWR('/api/everybody', get, { initialData });

  return (
    <Layout>
      <h1>All TakeShape Profiles (SSR)</h1>

      <p>
        This page will display a list of information from all the profiles in your TakeShape project. It is a public
        path, and will be rendered on the server.
      </p>
      <p>
        It utilizes the Next.js API proxy to include a TakeShape API key with your request. TakeShape API keys can be
        scoped for the narrow permissions your app requires, but you still may not want to reveal them publicly.
      </p>

      {!data && <p>Loading TakeShape profiles...</p>}

      {data && (
        <div>
          <h2>Profiles</h2>

          {data.length ? (
            <ul>
              {data.map(({ _id, avatar, firstName, lastName, bio }) => {
                return (
                  <li key={_id}>
                    <div>{avatar && <img src={buildImageUrl(avatar, { h: 100, w: 100 })} />}</div>
                    <div>
                      <strong>
                        {firstName} {lastName}
                      </strong>
                      <div>{bio}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <span>No profiles to display!</span>
          )}
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

export async function getServerSideProps() {
  const data = await get(`${baseUrl}/api/everybody`);
  return { props: { data } };
}
