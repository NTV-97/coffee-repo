import React, { ReactNode } from 'react';
import { StyleSheet, View, Animated, ViewProps, ViewStyle, StyleProp } from 'react-native';
import { colors, sizes } from '../../theme';

export interface IPropsDiv {
  margin?: Array<number> | number;
  padding?: Array<number> | number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  width?: number | string;
  height?: number | string;
  flex?: number;
  row?: boolean;
  column?: boolean;
  center?: boolean;
  middle?: boolean;
  alignLeft?: boolean;
  alignRight?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  centerSelf?: boolean;
  startSelf?: boolean;
  endSelf?: boolean;
  baselineSelf?: boolean;
  radius?: number;
  shadow?: boolean;
  backgroundColor?: string;
  space?: 'around' | 'between' | 'evenly';
  animated?: boolean;
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  //color
  white?: boolean;
  black?: boolean;
  green?: boolean;
  blue?: boolean;
  pink?: boolean;
  gold?: boolean;
  darkBlue?: boolean;
  darkestBlue?: boolean;
  gray?: boolean;
  lightGray?: boolean;
  yellow?: boolean;
  orange?: boolean;

  zIndex?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';
  borderWidth?: number;
  borderColor?: string;
  card?: boolean;
  absolute?: boolean;
  relative?: boolean;
  positionTop?: number;
  positionRight?: number;
  positionBottom?: number;
  positionLeft?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  style?: ViewStyle;
  children?: ReactNode | JSX.Element;
}

export const Div: React.FC<ViewProps & IPropsDiv> = ({
  margin,
  padding,
  pt,
  pr,
  pb,
  pl,
  mt,
  mr,
  mb,
  ml,
  width,
  height,
  flex,
  row,
  column,
  center,
  middle,
  alignLeft,
  alignRight,
  left,
  right,
  top,
  bottom,
  centerSelf,
  startSelf,
  endSelf,
  baselineSelf,
  radius,
  shadow,
  backgroundColor,
  space,
  animated,
  wrap,
  // color
  white,
  black,
  green,
  blue,
  pink,
  gold,
  darkBlue,
  darkestBlue,
  gray,
  lightGray,
  yellow,
  orange,

  zIndex,
  overflow,
  borderWidth,
  borderColor,
  card,
  absolute,
  relative,
  positionTop,
  positionRight,
  positionBottom,
  positionLeft,
  borderStyle,
  style,
  children,
  ...props
}) => {
  const handleMargins = () => {
    if (typeof margin === 'number') {
      return {
        marginTop: margin,
        marginRight: margin,
        marginBottom: margin,
        marginLeft: margin,
      };
    }
    if (typeof margin === 'object') {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: margin[0],
            marginRight: margin[0],
            marginBottom: margin[0],
            marginLeft: margin[0],
          };
        case 2:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[0],
            marginLeft: margin[1],
          };
        case 3:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[1],
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3],
          };
      }
    }
  };

  const handlePaddings = () => {
    if (typeof padding === 'number') {
      return {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding,
      };
    }
    if (typeof padding === 'object') {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: padding[0],
            paddingRight: padding[0],
            paddingBottom: padding[0],
            paddingLeft: padding[0],
          };
        case 2:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[0],
            paddingLeft: padding[1],
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[1],
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3],
          };
      }
    }
  };

  const blockStyles: StyleProp<ViewStyle> = [
    styles.block,
    width ? { width } : undefined,
    height ? { height } : undefined,
    flex ? { flex } : undefined,
    pt ? { paddingTop: pt } : undefined,
    pr ? { paddingRight: pr } : undefined,
    pb ? { paddingBottom: pb } : undefined,
    pl ? { paddingLeft: pl } : undefined,
    mt ? { marginTop: mt } : undefined,
    mr ? { marginRight: mr } : undefined,
    mb ? { marginBottom: mb } : undefined,
    ml ? { marginLeft: ml } : undefined,
    row && styles.row,
    column && styles.column,
    center && styles.center,
    middle && styles.middle,
    alignLeft && styles.alignLeft,
    alignRight && styles.alignRight,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    centerSelf && styles.centerSelf,
    startSelf && styles.startSelf,
    endSelf && styles.endSelf,
    baselineSelf && styles.baselineSelf,
    radius ? { borderRadius: radius } : undefined,
    margin ? { ...handleMargins() } : undefined,
    padding ? { ...handlePaddings() } : undefined,
    shadow && styles.shadow,
    space && { justifyContent: `space-${space}` },
    wrap && { flexWrap: wrap },
    // color
    white && styles.white,
    black && styles.black,
    green && styles.green,
    blue && styles.blue,
    pink && styles.pink,
    gold && styles.gold,
    darkBlue && styles.darkBlue,
    darkestBlue && styles.darkestBlue,
    gray && styles.gray,
    lightGray && styles.lightGray,
    yellow && styles.yellow,
    orange && styles.orange,

    backgroundColor ? { backgroundColor: backgroundColor } : undefined, // custom backgroundColor
    zIndex ? { zIndex } : undefined,
    overflow ? { overflow } : undefined,
    borderWidth ? { borderWidth } : undefined,
    borderColor ? { borderColor } : undefined,
    card && styles.card,
    absolute && styles.absolute,
    relative && styles.relative,
    positionTop ? { top: positionTop } : undefined,
    positionRight ? { right: positionRight } : undefined,
    positionBottom ? { bottom: positionBottom } : undefined,
    positionLeft ? { left: positionLeft } : undefined,
    borderStyle ? { borderStyle } : undefined,
    style, // rewrite predefined styles
  ];

  if (animated) {
    return (
      <Animated.View style={blockStyles} {...props}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={blockStyles} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 0,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  centerSelf: {
    alignSelf: 'center',
  },
  startSelf: {
    alignSelf: 'flex-start',
  },
  endSelf: {
    alignSelf: 'flex-end',
  },
  baselineSelf: {
    alignSelf: 'baseline',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 2,
  },

  // color
  white: { backgroundColor: colors.white },
  black: { backgroundColor: colors.black },
  green: { backgroundColor: colors.green },
  blue: { backgroundColor: colors.blue },
  pink: { backgroundColor: colors.pink },
  gold: { backgroundColor: colors.gold },
  darkBlue: { backgroundColor: colors.darkBlue },
  darkestBlue: { backgroundColor: colors.darkestBlue },
  gray: { backgroundColor: colors.gray },
  lightGray: { backgroundColor: colors.lightGray },
  yellow: { backgroundColor: colors.yellow },
  orange: { backgroundColor: colors.orange },

  card: {
    borderRadius: sizes.radius * 2,
  },
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
});
