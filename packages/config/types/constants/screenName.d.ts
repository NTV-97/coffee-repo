type ScreenNameObjectType = {
  SIGN_IN: 'SIGN_IN';
  SIGN_UP: 'SIGN_UP';
  HOME: 'HOME';
  INTRODUCTION_AUTH: 'INTRODUCTION_AUTH';
};
export declare const SCREEN_NAME: ScreenNameObjectType;
export type ScreenNameType = keyof typeof SCREEN_NAME;
export {};
