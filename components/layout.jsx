import React from 'react';
import Head from 'next/head';

import Header from './header';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Next.js with Auth0</title>
    </Head>

    <Header />

    <main>
      <div className="container">{children}</div>
    </main>

    <style jsx>{`
      .container {
        max-width: 42rem;
        margin: 1.5rem auto;
      }
    `}</style>
    <style jsx global>{`
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
      }
    `}</style>
  </>
);

export default Layout;
