import { ApolloQueryResult } from '@apollo/client';
import {
  Exact,
  GetMerchandiseGroupQuery,
  GetMerchandiseQuery,
  GetOrdersQuery,
  GetUnitMerchandiseQuery,
} from '@graphql';
export type RefetchGetOrdersQuery = (
  variables?:
    | Partial<
        Exact<{
          [key: string]: never;
        }>
      >
    | undefined,
) => Promise<ApolloQueryResult<GetOrdersQuery>>;
export type RefetchGetMerchandiseQuery = (
  variables?:
    | Partial<
        Exact<{
          [key: string]: never;
        }>
      >
    | undefined,
) => Promise<ApolloQueryResult<GetMerchandiseQuery>>;
export type RefetchGetUnitMerchandiseQuery = (
  variables?:
    | Partial<
        Exact<{
          [key: string]: never;
        }>
      >
    | undefined,
) => Promise<ApolloQueryResult<GetUnitMerchandiseQuery>>;
export type RefetchGetMerchandiseGroupQuery = (
  variables?:
    | Partial<
        Exact<{
          [key: string]: never;
        }>
      >
    | undefined,
) => Promise<ApolloQueryResult<GetMerchandiseGroupQuery>>;
export declare class Refetch {
  private refetchGetOrders;
  set setRefetchGetOrders(refetch: RefetchGetOrdersQuery);
  set _refetchGetOrders(refetch: RefetchGetOrdersQuery | undefined);
  get _refetchGetOrders(): RefetchGetOrdersQuery | undefined;
  useRefetch(): {
    refetchGetOrders: RefetchGetOrdersQuery | undefined;
  };
}
