import React from 'react';
import { StyleProp } from 'react-native';
import { Div, IPropsDiv } from './Div';
import { colors } from '../../theme';

interface InterfaceProps {
  animated?: boolean;
  vertical?: boolean;
  color?: string;
  style?: StyleProp<any>;
}

export const Divider: React.FC<InterfaceProps & IPropsDiv> = ({
  animated,
  color,
  style,
  vertical,
  ...props
}) => {
  return (
    <Div
      animated={animated}
      backgroundColor={color || colors.borderGray}
      width={vertical ? 1 : '100%'}
      height={vertical ? '100%' : 1}
      style={style}
      {...props}
    />
  );
};
