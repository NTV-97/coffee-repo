import React from 'react';
import { StyleProp } from 'react-native';
import { IPropsDiv } from './Div';
interface InterfaceProps {
  animated?: boolean;
  vertical?: boolean;
  color?: string;
  style?: StyleProp<any>;
}
export declare const Divider: React.FC<InterfaceProps & IPropsDiv>;
export {};
