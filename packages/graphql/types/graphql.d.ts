import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<
  T extends {
    [key: string]: unknown;
  },
> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  TypeUser: any;
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
  login: {
    __typename?: 'Login';
    message: string;
    token?: string | null;
  };
};
export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  password: Scalars['String'];
  type: Scalars['TypeUser'];
}>;
export type SignupMutation = {
  __typename?: 'Mutation';
  signup: {
    __typename?: 'Success';
    message: string;
    success: boolean;
  };
};
export type GetUsersQueryVariables = Exact<{
  [key: string]: never;
}>;
export type GetUsersQuery = {
  __typename?: 'Query';
  getUsers?: Array<{
    __typename?: 'User';
    id: string;
    type: any;
    adminId?: string | null;
    email: string;
  } | null> | null;
};
export declare const LoginDocument: Apollo.DocumentNode;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export declare function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
): Apollo.MutationTuple<
  LoginMutation,
  Exact<{
    email?: InputMaybe<string> | undefined;
    phoneNumber?: InputMaybe<string> | undefined;
    password: string;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export declare const SignupDocument: Apollo.DocumentNode;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;
export declare function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>,
): Apollo.MutationTuple<
  SignupMutation,
  Exact<{
    email: string;
    phoneNumber: string;
    password: string;
    type: any;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export declare const GetUsersDocument: Apollo.DocumentNode;
export declare function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
): Apollo.QueryResult<
  GetUsersQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
): Apollo.LazyQueryResultTuple<
  GetUsersQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export declare function refetchGetUsersQuery(variables?: GetUsersQueryVariables): {
  query: Apollo.DocumentNode;
  variables:
    | Exact<{
        [key: string]: never;
      }>
    | undefined;
};
