import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';
import { UpsertMyProfile } from 'lib/queries';
import { TakeshapeContext } from './context';

// Ensure a profile is created for the Auth0 user
export const TakeshapeProvider = ({ children }) => {
  const { user } = useAuth0();

  const [upsertMyProfile, { data: profileData, loading: profileLoading }] = useMutation(UpsertMyProfile);

  useEffect(async () => {
    // Logged in
    if (user && !profileLoading && !profileData) {
      upsertMyProfile();
    }
  }, [user, profileData, profileLoading]);

  return (
    <TakeshapeContext.Provider
      value={{
        isProfileReady: Boolean(profileData),
        profile: profileData
      }}
    >
      {children}
    </TakeshapeContext.Provider>
  );
};

export default TakeshapeProvider;
