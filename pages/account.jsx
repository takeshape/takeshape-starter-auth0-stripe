import { Themed, Heading, Divider, Alert, Container, Spinner } from 'theme-ui';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Page, Section } from 'components/layout';
import { ProfileForm, CustomerForm } from 'components/forms';
import { useQuery } from 'lib/hooks/use-takeshape';

function AccountPage() {
  const { data: profileData, error: profileError } = useQuery('GetMyProfile');

  return (
    <Page>
      <Themed.h1>Account</Themed.h1>
      <Divider />

      <Section>
        <Heading>TakeShape Profile</Heading>
        <Divider />

        {!profileData && (
          <Container variant="layout.loading">
            <Spinner />
          </Container>
        )}

        {profileData && <ProfileForm profile={profileData.profile} />}
      </Section>

      <Section>
        <Heading>Stripe Customer</Heading>
        <Divider />

        {!profileData && (
          <Container variant="layout.loading">
            <Spinner />
          </Container>
        )}

        {profileData && <CustomerForm customer={profileData.profile.customer} />}
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
