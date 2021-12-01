import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from './use-takeshape';

function useLogin() {
  const { loginWithPopup } = useAuth0();
  const [, setProfilePayload] = useMutation('UpsertMyProfile');

  const [login, setLogin] = useState(false);

  useEffect(() => {
    const doLogin = async () => {
      await loginWithPopup();
      setProfilePayload({});
      setLogin(false);
    };

    if (login) {
      doLogin();
    }
  }, [login]);

  return { login: () => setLogin(true) };
}

export default useLogin;
