import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export function createApolloClient(uri, getAuthToken) {
  const httpLink = createHttpLink({
    uri
  });

  const withToken = setContext(async () => {
    let token;

    if (getAuthToken) {
      token = await getAuthToken();
    }

    return { token };
  });

  const authLink = new ApolloLink((operation, forward) => {
    const { token, headers } = operation.getContext();

    if (!headers?.Authorization) {
      operation.setContext(() => ({
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      }));
    }

    return forward(operation);
  });

  const client = new ApolloClient({
    link: ApolloLink.from([withToken, authLink.concat(httpLink)]),
    cache: new InMemoryCache()
  });

  return client;
}
