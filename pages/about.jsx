/** @jsxImportSource theme-ui */
import { Divider, Heading, Paragraph, Themed, Link } from 'theme-ui';
import { Page, Section } from 'components/layout';

const dependencies = [
  {
    title: 'Next.js',
    link: 'https://nextjs.org',
    description: 'A framework for building fast sites and simple API proxies'
  },
  {
    title: '@auth0/nextjs-auth0',
    link: 'https://github.com/auth0/nextjs-auth0',
    description: 'Auth0 bindings for Next.js.'
  },
  {
    title: 'Stripe.js',
    link: 'https://github.com/stripe/stripe-js',
    description: 'Stripe’s Javscript library.'
  },
  {
    title: 'graphql-request',
    link: 'https://github.com/prisma-labs/graphql-request',
    description: 'A minimal GraphQL client.'
  },
  {
    title: 'Theme UI',
    link: 'https://theme-ui.com',
    description: 'Easily theme-able primitive React components.'
  },
  {
    title: 'react-hook-form',
    link: 'https://react-hook-form.com',
    description: 'The easiest most composable way to work with forms in React that I‘ve used.'
  },
  {
    title: 'swr',
    link: 'https://github.com/vercel/swr',
    description: 'A React hook library that does easy, cached data fetching and invalidation.'
  }
];

export default function AboutPage() {
  return (
    <Page>
      <Themed.h1>About</Themed.h1>
      <Divider />

      <Section>
        <Paragraph>
          This project is based on the{' '}
          <Link to="https://github.com/auth0/nextjs-auth0/tree/main/examples/kitchen-sink-example">
            Auth0 examples for Next.js
          </Link>
          .
        </Paragraph>
      </Section>

      <Section>
        <Heading>Key Dependencies</Heading>
        <Divider />
        <ul
          sx={{
            listStyle: 'none',
            m: 0,
            px: 0,
            py: 4
          }}
        >
          {dependencies.map((dependency) => (
            <li
              key={dependency.link}
              sx={{
                mb: 4
              }}
            >
              <Themed.h3
                sx={{
                  m: 0
                }}
              >
                <Link
                  to={dependency.link}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    ':hover,:focus': {
                      color: 'primary',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }
                  }}
                >
                  {dependency.title}
                </Link>
              </Themed.h3>
              <Paragraph>{dependency.description}</Paragraph>
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  );
}
