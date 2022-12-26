import React from 'react';
interface IPropsModal {
  isVisible: boolean;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  children: React.ReactNode;
}
export declare const Modal: React.MemoExoticComponent<
  ({ isVisible, onBackdropPress, onBackButtonPress, children }: IPropsModal) => JSX.Element
>;
export {};
