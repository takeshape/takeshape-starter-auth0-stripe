import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { Container, Flex, NavLink, Box } from 'theme-ui';
import { CartIcon } from './cart';

const Header = () => {
  const { user } = useUser();

  return (
    <Container as="header">
      <Flex as="nav">
        <Link href="/" passHref>
          <NavLink p={2}>Home</NavLink>
        </Link>
        <Link href="/about" passHref>
          <NavLink p={2}>About</NavLink>
        </Link>
        <Link href="/products" passHref>
          <NavLink p={2}>Products</NavLink>
        </Link>
        <Box variant="styles.flexspace" />
        {user ? (
          <>
            <Link href="/account" passHref>
              <NavLink p={2}>Account</NavLink>
            </Link>
            <Box variant="links.nav">
              <NavLink href="/api/auth/logout" p={2}>
                Logout
              </NavLink>
            </Box>
          </>
        ) : (
          <Box variant="links.nav">
            <NavLink href="/api/auth/login" p={2}>
              Login
            </NavLink>
          </Box>
        )}
        <Box variant="links.nav">
          <CartIcon />
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;
