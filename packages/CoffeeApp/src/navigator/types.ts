import { Product } from 'graphql-hook';

export type RootStackParamList = {
  HOME: any;
  SIGN_IN: any;
  SIGN_UP: any;
  INTRODUCTION_AUTH: any;
  BOTTOM_TAB: BottomTabParamsList;
  PRODUCT_DETAIL: { productId: string };
  PRODUCT_BY_CATEGORY: { product: Product[] };
  UPDATE_USER_INFO: any;
  SETTING: any;
  ORDER: any;
  ORDER_STATUS: { idOrder: string };
  ORDER_HISTORY: any;
};

export type BottomTabParamsList = {
  HOME: any;
  CART: any;
  SETTING: any;
};
