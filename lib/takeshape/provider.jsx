import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';
import { UpsertMyProfile, UpsertMyCustomer, GetMyProfile } from 'lib/queries';
import { TakeshapeContext } from './context';

// Ensure a profile is created for the Auth0 user
export const TakeshapeProvider = ({ children }) => {
  const { user } = useAuth0();

  const [upsertMyProfile, { data: profileData, loading: profileUpdating }] = useMutation(UpsertMyProfile, {
    update: (cache, result) => {
      cache.writeQuery({ query: GetMyProfile, ...result });
    }
  });

  //   const [upsertMyCustomer, { data: customerData, loading: customerUpdating }] = useMutation(UpsertMyCustomer, {
  //     update: (cache, result) => {
  //       const data = {
  //         ...profileData.profile,
  //         ...result.data
  //       };
  //       console.log(data);
  //       cache.writeQuery({ query: GetMyProfile, data });
  //     }
  //   });

  useEffect(() => {
    // Logged in
    if (user && !profileUpdating && !profileData) {
      upsertMyProfile();
    }
  }, [user, profileData, profileUpdating]);

  //   useEffect(() => {
  //     // No Stripe data yet
  //     console.log('effect');
  //     if (user && profileData && !profileData.profile.customer.id && !customerData?.customer.id && !customerUpdating) {
  //       console.log('upserting', { profileData });
  //       upsertMyCustomer();
  //     }
  //   }, [user, profileData, customerData, customerUpdating]);

  //   console.log({ user, profileData, customerData });

  return (
    <TakeshapeContext.Provider
      value={{
        isProfileReady: Boolean(profileData)
      }}
    >
      {children}
    </TakeshapeContext.Provider>
  );
};

export default TakeshapeProvider;
