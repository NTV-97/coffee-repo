import { ApolloQueryResult } from '@apollo/client';
import { Exact, GetCategoriesQuery, GetProductsQuery } from 'graphql-hook';

export type RootStackParamList = {
  HOME: any;
  SIGN_IN: any;
  SIGN_UP: any;
  INTRODUCTION_AUTH: any;
  BOTTOM_TAB: BottomTabParamsList;
  PRODUCT_DETAIL: { productId: string };
  PRODUCT_BY_CATEGORY: { idCategory: string };
  UPDATE_USER_INFO: any;
  SETTING: any;
  ORDER: any;
  ORDER_STATUS: { idOrder: string };
  ORDER_HISTORY: any;
  CREATE_CATEGORY: {
    refetch: (
      variables?:
        | Partial<
            Exact<{
              [key: string]: never;
            }>
          >
        | undefined,
    ) => Promise<ApolloQueryResult<GetCategoriesQuery>>;
  };
  UPDATE_CATEGORY: { idCategory: string };
  CREATE_PRODUCT: {
    idCategory: string;
    refetch?: (
      variables?:
        | Partial<
            Exact<{
              [key: string]: never;
            }>
          >
        | undefined,
    ) => Promise<ApolloQueryResult<GetProductsQuery>>;
  };
  UPDATE_PRODUCT: { idProduct: string };
  HOME_ADMIN: any;
  ORDER_ADMIN: any;
  CART: any;
};

export type BottomTabParamsList = {
  HOME: any;
  CART: any;
  SETTING: any;
};
