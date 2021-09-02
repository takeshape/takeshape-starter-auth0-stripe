import React from 'react';
import { Divider, Heading, Paragraph, Themed } from 'theme-ui';

import Layout from '../components/layout';

export default function AboutPage() {
  return (
    <Layout>
      <Themed.h1>About</Themed.h1>
      <Divider />
      <Paragraph>
        This project is based on the{' '}
        <a href="https://github.com/auth0/nextjs-auth0/tree/main/examples/kitchen-sink-example">
          Auth0 examples for Next.js
        </a>
        .
      </Paragraph>

      <Heading>Key Dependencies</Heading>
      <ul>
        <li>
          <p>
            <strong>
              <a href="https://nextjs.org">Next.js</a>
            </strong>
          </p>
          <p>A framework for building fast sites and simple API proxies</p>
        </li>
        <li>
          <p>
            <strong>
              <a href="https://github.com/auth0/nextjs-auth0">@auth0/nextjs-auth0</a>
            </strong>
          </p>
          <p>Auth0 bindings for Next.js.</p>
        </li>
        <li>
          <p>
            <strong>
              <a href="https://github.com/prisma-labs/graphql-request">graphql-request</a>
            </strong>
          </p>
          <p>A minimal GraphQL client.</p>
        </li>
        <li>
          <p>
            <strong>
              <a href="https://react-hook-form.com">react-hook-form</a>
            </strong>
          </p>
          <p>The easiest most composable way to work with forms in React that I've used.</p>
        </li>
        <li>
          <p>
            <strong>
              <a href="https://github.com/vercel/swr">swr</a>
            </strong>
          </p>
          <p>A React hook library that does easy, cached data fetching and invalidation.</p>
        </li>
      </ul>
    </Layout>
  );
}
