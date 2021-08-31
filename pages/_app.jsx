import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { globalStyles } from '../components/global-styles';
import CartProvider from '../lib/contexts/cart';

export default function App({ Component, pageProps }) {
  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      <CartProvider>
        {globalStyles}
        <Component {...pageProps} />
      </CartProvider>
    </UserProvider>
  );
}
