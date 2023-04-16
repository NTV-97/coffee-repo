type ScreenNameObjectType = {
  SIGN_IN: 'SIGN_IN';
  SIGN_UP: 'SIGN_UP';
  HOME: 'HOME';
  INTRODUCTION_AUTH: 'INTRODUCTION_AUTH';
  BOTTOM_TAB: 'BOTTOM_TAB';
  CART: 'CART';
  SETTING: 'SETTING';
  PRODUCT_DETAIL: 'PRODUCT_DETAIL';
  PRODUCT_BY_CATEGORY: 'PRODUCT_BY_CATEGORY';
  UPDATE_USER_INFO: 'UPDATE_USER_INFO';
  ORDER: 'ORDER';
  ORDER_STATUS: 'ORDER_STATUS';
  ORDER_HISTORY: 'ORDER_HISTORY';
  CREATE_CATEGORY: 'CREATE_CATEGORY';
  UPDATE_CATEGORY: 'UPDATE_CATEGORY';
  CREATE_PRODUCT: 'CREATE_PRODUCT';
  UPDATE_PRODUCT: 'UPDATE_PRODUCT';
  HOME_ADMIN: 'HOME_ADMIN';
  ORDER_ADMIN: 'ORDER_ADMIN';
};

export const SCREEN_NAME: ScreenNameObjectType = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  HOME: 'HOME',
  INTRODUCTION_AUTH: 'INTRODUCTION_AUTH',
  BOTTOM_TAB: 'BOTTOM_TAB',
  CART: 'CART',
  SETTING: 'SETTING',
  PRODUCT_DETAIL: 'PRODUCT_DETAIL',
  PRODUCT_BY_CATEGORY: 'PRODUCT_BY_CATEGORY',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  ORDER: 'ORDER',
  ORDER_STATUS: 'ORDER_STATUS',
  ORDER_HISTORY: 'ORDER_HISTORY',
  CREATE_CATEGORY: 'CREATE_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  HOME_ADMIN: 'HOME_ADMIN',
  ORDER_ADMIN: 'ORDER_ADMIN',
};

export type ScreenNameType = keyof typeof SCREEN_NAME;
