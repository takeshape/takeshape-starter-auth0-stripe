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
    <style jsx global>{`
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
      }
      pre {
        overflow-x: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    `}</style>
  </>
);

export default Layout;
