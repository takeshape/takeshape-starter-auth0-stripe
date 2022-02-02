import Router from 'next/router';
import { ThemeProvider, jsx } from '@theme-ui/core';
import theme from 'lib/theme';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthorizedApolloProvider } from 'lib/apollo';
import { CartProvider } from 'lib/cart';
import { TakeshapeProvider } from 'lib/takeshape';
import { clientId, domain, scope, audience, takeshapeApiUrl } from 'lib/config';
import { Global } from '@emotion/react';
import { css } from '@theme-ui/css';

const onRedirectCallback = (appState) => {
  Router.replace(appState?.returnTo ?? '/');
};

const RootStyles = () =>
  jsx(Global, {
    styles: (emotionTheme) => {
      const theme = emotionTheme;
      const { useRootStyles } = theme.config || theme;

      if (useRootStyles === false || (theme.styles && !theme.styles.root)) {
        return null;
      }

      const boxSizing = theme.config?.useBorderBox === false ? undefined : 'border-box';

      return css({
        '*': {
          boxSizing
        },
        html: {
          variant: 'styles.root'
        },
        body: {
          margin: 0
        }
      })(theme);
    }
  });

export default function App({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      scope={scope}
      audience={audience}
      redirectUri={typeof window !== 'undefined' && window.location.origin}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      <AuthorizedApolloProvider uri={takeshapeApiUrl}>
        <TakeshapeProvider>
          <CartProvider>
            <ThemeProvider theme={theme}>
              <RootStyles />
              <Component {...pageProps} />
            </ThemeProvider>
          </CartProvider>
        </TakeshapeProvider>
      </AuthorizedApolloProvider>
    </Auth0Provider>
  );
}
