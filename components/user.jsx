import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApolloClient } from '@apollo/client';
import { Button } from '@theme-ui/components';

export const Logout = () => {
  const { resetStore } = useApolloClient();
  const { logout } = useAuth0();

  const handleLogout = useCallback(async () => {
    await resetStore();
    await logout();
  }, [logout, resetStore]);

  return (
    <Button variant="logout" onClick={handleLogout} p={2} mr={2}>
      Logout
    </Button>
  );
};

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button variant="login" onClick={loginWithRedirect} p={2} mr={2}>
      Login
    </Button>
  );
};
