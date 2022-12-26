import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  TypeUser: 'admin' | 'manage' | 'staff';
};

export type Login = {
  __typename?: 'Login';
  message: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Success;
  deleteUser: Success;
  editUser: User;
  login: Login;
  signup: Success;
};

export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  type: Scalars['TypeUser'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationEditUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  type: Scalars['TypeUser'];
};

export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  type: Scalars['TypeUser'];
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};

export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type Success = {
  __typename?: 'Success';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  adminId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  type: Scalars['TypeUser'];
};

export type LoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'Login'; message: string; token?: string | null };
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  password: Scalars['String'];
  type: Scalars['TypeUser'];
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup: { __typename?: 'Success'; message: string; success: boolean };
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: 'Query';
  getUsers?: Array<{
    __typename?: 'User';
    id: string;
    type: 'admin' | 'manage' | 'staff';
    adminId?: string | null;
    email: string;
  } | null> | null;
};

export const LoginDocument = gql`
  mutation login($email: String, $phoneNumber: String, $password: String!) {
    login(email: $email, phoneNumber: $phoneNumber, password: $password) {
      message
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const SignupDocument = gql`
  mutation signup($email: String!, $phoneNumber: String!, $password: String!, $type: TypeUser!) {
    signup(email: $email, phoneNumber: $phoneNumber, password: $password, type: $type) {
      message
      success
    }
  }
`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *      password: // value for 'password'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const GetUsersDocument = gql`
  query GetUsers {
    getUsers {
      id
      type
      adminId
      email
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
  return { query: GetUsersDocument, variables: variables };
}
