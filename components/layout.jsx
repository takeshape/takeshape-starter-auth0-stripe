import React from 'react';
import Head from 'next/head';

import Header from './header';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>TakeShape Starter for Auth0</title>
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
  </>
);

export default Layout;
