type ScreenNameObjectType = {
  SIGN_IN: 'SIGN_IN';
  SIGN_UP: 'SIGN_UP';
  HOME: 'HOME';
  INTRODUCTION_AUTH: 'INTRODUCTION_AUTH';
};

export const SCREEN_NAME: ScreenNameObjectType = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  HOME: 'HOME',
  INTRODUCTION_AUTH: 'INTRODUCTION_AUTH',
};

export type ScreenNameType = keyof typeof SCREEN_NAME;
