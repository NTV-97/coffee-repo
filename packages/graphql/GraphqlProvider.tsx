import React, { useEffect, useState } from 'react';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { constants, utils } from 'config';
import { onError } from '@apollo/client/link/error';
const { storage } = utils;
const { API_URI } = constants;

const cache = new InMemoryCache();
const errorLink = onError(({ graphQLErrors, networkError, response, operation }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      console.error(
        `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
        operation,
        response,
      );
    }
  }
  if (networkError) {
    console.error(
      `[Network error]: ${networkError}`,
      'operation:',
      operation,
      'response: ',
      response,
    );
  }
});

const createHttpLink = (_token: string | null) => {
  const headers = _token?.length
    ? {
        Authorization: `Bearer ${_token}`,
      }
    : undefined;
  return new HttpLink({
    uri: API_URI,
    headers,
  });
};

const createClient = (_link: HttpLink) => {
  return new ApolloClient({
    cache,
    link: ApolloLink.from([errorLink, _link]),
    connectToDevTools: true,
    assumeImmutableResults: true,
  });
};

type IPropsGraphqlProvider = {
  children?: React.ReactNode | React.ReactNode[];
};
export const GraphqlProvider: React.FC<IPropsGraphqlProvider> = ({ children }) => {
  // const { session } = useSelector((store: RootState) => store);
  const [token, setToken] = useState('');
  const link = createHttpLink(token);
  const client = createClient(link);
  useEffect(() => {
    const getToken = async () => {
      const _token = await storage.getItem('token');
      if (_token) {
        setToken(_token);
      }
    };
    getToken();
  }, []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
