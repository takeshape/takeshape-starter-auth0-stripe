import { Container, Flex, NavLink, Box, Text } from '@theme-ui/components';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth0 } from '@auth0/auth0-react';
import { CartIcon, CartSidebar } from './cart';
import Notifications from './notifications';
import { Logout, Login } from './user';

export const Header = () => {
  const { user } = useAuth0();

  return (
    <Container as="header">
      <Flex as="nav">
        <Link href="/" passHref>
          <NavLink p={2}>Home</NavLink>
        </Link>
        <Link href="/about" passHref>
          <NavLink p={2}>About</NavLink>
        </Link>
        <Box variant="styles.flexspace" />
        {user ? (
          <>
            <Link href="/account" passHref>
              <NavLink p={2}>Account</NavLink>
            </Link>
            <Link href="/purchases" passHref>
              <NavLink p={2}>Purchases</NavLink>
            </Link>
            <Box variant="links.nav">
              <Logout />
            </Box>
          </>
        ) : (
          <Box variant="links.nav">
            <Login />
          </Box>
        )}
        <Box variant="links.nav">
          <CartIcon />
        </Box>
      </Flex>
    </Container>
  );
};

export const Footer = () => {
  return (
    <Container as="footer" variant="layout.footer">
      <Text variant="smallHeading">
        Made by <Link href="https://www.takeshape.io">TakeShape</Link>
      </Text>
    </Container>
  );
};

export const Section = ({ children, ...props }) => {
  return (
    <Box
      as="section"
      sx={{
        mb: 4
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const Page = ({ children }) => {
  return (
    <Flex variant="layout.page">
      <Head>
        <title>TakeShape Starter for Auth0 &amp; Stripe</title>
      </Head>

      <Header />

      <Container as="main" variant="layout.main">
        {children}
      </Container>

      <CartSidebar />
      <Notifications />

      <Footer />

      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        }
      `}</style>
    </Flex>
  );
};

export default Page;
