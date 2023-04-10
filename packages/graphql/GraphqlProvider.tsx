import React from 'react';
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

export class GraphqlProvider extends React.Component<IPropsGraphqlProvider, { token: string }> {
  constructor(props: IPropsGraphqlProvider) {
    super(props);
    this.state = {
      token: '',
    };
  }
  componentDidMount() {
    const getToken = async () => {
      const _token = await storage.getItem('token');
      if (_token) {
        this.setState({ token: _token });
      }
    };
    getToken();
  }

  render() {
    const { token } = this.state;
    const link = createHttpLink(token);
    const client = createClient(link);
    return <ApolloProvider client={client}>{this.props.children}</ApolloProvider>;
  }
}
