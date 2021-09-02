import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { Container, Flex, NavLink, Box } from 'theme-ui';
import Cart from './cart';

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
            <Link href="/api/auth/logout" passHref>
              <NavLink p={2}>Logout</NavLink>
            </Link>
            {/* {profile?.avatar?.path && (
                  <img src={buildImageUrl(profile.avatar, { h: 50, w: 50, mask: 'ellipse', 'mask-bg': '28214a' })} />
                )} */}
          </>
        ) : (
          <Link href="/api/auth/login" passHref>
            <NavLink p={2}>Login</NavLink>
          </Link>
        )}
        <Box variant="styles.navbox">
          <Cart />
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;
