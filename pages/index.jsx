import React from 'react';
import NextLink from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { Themed, Paragraph, Heading, Link, Divider } from 'theme-ui';
import Layout from '../components/layout';
import Section from '../components/section';

export default function HomePage() {
  const { user, error, isLoading } = useUser();

  return (
    <Layout>
      <Themed.h1>TakeShape Starter for Auth0</Themed.h1>
      <Divider />

      <Section>
        {isLoading && <Heading>Loading login...</Heading>}

        {error && (
          <>
            <Heading>Error</Heading>
            <pre>{error.message}</pre>
          </>
        )}

        {user && (
          <>
            <Heading>Congratulations {user.name || user.email}! You've logged in. 🎉</Heading>
            <Paragraph>
              When you signed in a TakeShape profile was automatically created for you using identifying details from
              your Auth0 user token.
            </Paragraph>
            <Paragraph>
              Now head over to the{' '}
              <NextLink href="/account" passHref>
                <Link>account</Link>
              </NextLink>{' '}
              page and update your profile.
            </Paragraph>
          </>
        )}

        {!isLoading && !error && !user && (
          <>
            <Heading>
              Before you proceed follow the instructions in the{' '}
              <Link target="_blank" href="https://github.com/takeshape/takeshape-starter-auth0/">
                README
              </Link>
              .
            </Heading>

            <Paragraph>
              To test the login click <a href="/api/auth/login">Login</a> here or in the header.
            </Paragraph>
            <Paragraph>
              Once you are logged in you will be able to view protected account URLs and update your profile in
              TakeShape.
            </Paragraph>
          </>
        )}
      </Section>
    </Layout>
  );
}
