import React, { useContext } from 'react';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { constants, utils } from 'config';
import { onError } from '@apollo/client/link/error';
import { Context } from 'config/context';
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
  token?: string;
};

export class GraphqlProvider extends React.Component<IPropsGraphqlProvider, { token: string }> {
  constructor(props: IPropsGraphqlProvider) {
    super(props);
    this.state = {
      token: props.token ?? '',
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
    const _token = this.props.token?.length ? this.props.token : token;
    const link = createHttpLink(_token);
    const client = createClient(link);
    return <ApolloProvider client={client}>{this.props.children}</ApolloProvider>;
  }
}
const withMyHook = (Component: any) => {
  const WrappedComponent = (props: any) => {
    const { state } = useContext(Context);
    return <Component {...props} token={state.token} />;
  };
  return WrappedComponent;
};

export default withMyHook(GraphqlProvider);
