import React from 'react';
import { TextProps, TextStyle } from 'react-native';
interface IPropsText {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  title?: boolean;
  header?: boolean;
  body?: boolean;
  caption?: boolean;
  small?: boolean;
  tiny?: boolean;
  size?: number;
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  align?: string;
  regular?: boolean;
  bold?: boolean;
  semibold?: boolean;
  medium?: boolean;
  light?: boolean;
  weight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | 'bold'
    | 'normal';
  primaryFont?: boolean;
  secondaryFont?: boolean;
  center?: boolean;
  right?: boolean;
  spacing?: number;
  height?: number;
  decorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  italic?: boolean;
  color?: string;
  green?: boolean;
  blue?: boolean;
  darkBlue?: boolean;
  pink?: boolean;
  white?: boolean;
  black?: boolean;
  gold?: boolean;
  darkestBlue?: boolean;
  gray?: boolean;
  yellow?: boolean;
  orange?: boolean;
  style?: TextStyle;
  allowFontScaling?: boolean;
  thin?: boolean;
}
export declare const Text: React.FC<IPropsText & TextProps>;
export {};
