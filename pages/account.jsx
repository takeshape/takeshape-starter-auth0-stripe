import { Heading, Divider, Alert, Container, Spinner } from '@theme-ui/components';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Page, Section } from 'components/layout';
import { ProfileForm, CustomerForm } from 'components/forms';
import { useQuery } from '@apollo/client';
import { GetMyProfile } from 'lib/queries';
import { useProfile } from 'lib/takeshape';

function AccountPage() {
  const { isProfileReady } = useProfile();
  const { data: profileData, error: profileError } = useQuery(GetMyProfile, {
    skip: !isProfileReady
  });

  return (
    <Page>
      <Heading as="h1">Account</Heading>
      <Divider />

      <Section>
        <Heading variant="smallHeading">TakeShape Profile</Heading>
        <Divider />

        {!profileData && <Spinner />}

        {profileData && <ProfileForm profile={profileData.profile} />}
      </Section>

      <Section>
        <Heading variant="smallHeading">Stripe Customer</Heading>
        <Divider />

        {!profileData && <Spinner />}

        {profileData && <CustomerForm customer={profileData.profile?.customer} />}
      </Section>

      {profileError && (
        <>
          <Alert>Error loading TakeShape profile</Alert>
          <pre style={{ color: 'red' }}>{JSON.stringify(profileError, null, 2)}</pre>
        </>
      )}
    </Page>
  );
}

export default withAuthenticationRequired(AccountPage, {
  onRedirecting: () => (
    <Container variant="layout.loading">
      <Spinner />
    </Container>
  )
});
