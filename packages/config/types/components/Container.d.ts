import React from 'react';
import { IPropsDiv } from './base';
interface IPropsContainer {
  isHeader?: boolean;
  isBack?: boolean;
  title?: string;
  isRightClose?: boolean;
  isDrawer?: boolean;
}
export declare const Container: React.FC<IPropsContainer & IPropsDiv>;
export {};
