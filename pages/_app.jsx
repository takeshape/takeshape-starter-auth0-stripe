import { UserProvider } from '@auth0/nextjs-auth0';
import { ThemeProvider } from 'theme-ui';
import theme from 'lib/styles/theme';
import CartProvider from 'lib/contexts/cart';

export default function App({ Component, pageProps }) {
  const { user } = pageProps;
  return (
    <UserProvider user={user}>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </CartProvider>
    </UserProvider>
  );
}
