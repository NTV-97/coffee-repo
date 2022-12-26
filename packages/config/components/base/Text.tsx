import React from 'react';
import { StyleSheet, Text as Typography, TextProps, TextStyle } from 'react-native';
import { fonts } from 'coffeeapp';

import { colors, sizes } from '../../theme';

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
  // styling
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
  spacing?: number; // letter-spacing
  height?: number; // line-height
  decorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  italic?: boolean;
  // colors
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

export const Text: React.FC<IPropsText & TextProps> = ({
  h1,
  h2,
  h3,
  h4,
  title,
  header,
  body,
  caption,
  small,
  tiny,
  size,
  transform,
  align,
  regular,
  bold,
  semibold,
  medium,
  light,
  primaryFont,
  secondaryFont,
  weight,
  center,
  right,
  spacing,
  height,
  color,
  green,
  blue,
  darkBlue,
  pink,
  white,
  black,
  gold,
  darkestBlue,
  gray,
  yellow,
  orange,
  decorationLine,
  italic,
  style,
  children,
  allowFontScaling,
  thin,
  ...props
}) => {
  const textStyles = [
    styles.text,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    h4 && styles.h4,
    title && styles.title,
    header && styles.header,
    body && styles.body,
    caption && styles.caption,
    small && styles.small,
    tiny && styles.tiny,
    size && { fontSize: size },
    transform && { textTransform: transform },
    align && { textAlign: align },
    height && { lineHeight: height },
    spacing && { letterSpacing: spacing },
    weight && { fontWeight: weight },
    regular && styles.regular,
    bold && styles.bold,
    semibold && styles.semibold,
    medium && styles.medium,
    light && styles.light,
    thin && styles.thin,
    center && styles.center,
    right && styles.right,
    decorationLine && { textDecorationLine: decorationLine },
    italic && { fontStyle: 'italic' },
    color && { color },
    // color && styles[color],
    // color && !styles[color] && { color },
    green && styles.green,
    blue && styles.blue,
    darkBlue && styles.darkBlue,
    pink && styles.pink,
    white && styles.white,
    black && styles.black,
    gold && styles.gold,
    darkestBlue && styles.darkestBlue,
    gray && styles.gray,
    yellow && styles.yellow,
    orange && styles.orange,
    style, // rewrite predefined styles
  ];

  return (
    //@ts-ignore
    <Typography style={textStyles} allowFontScaling={false} {...props}>
      {children}
    </Typography>
  );
};

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: sizes.body,
    color: colors.black,
    fontFamily: fonts.robotoRegular,
  },
  // variations
  regular: {
    fontFamily: fonts.robotoRegular,
  },
  bold: {
    fontFamily: fonts.robotoBlack,
  },
  semibold: {
    fontFamily: fonts.robotoBold,
  },
  medium: {
    fontFamily: fonts.robotoMedium,
  },
  light: {
    fontFamily: fonts.robotoLight,
  },
  thin: {
    fontFamily: fonts.robotoThin,
  },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // colors
  green: { color: colors.green },
  blue: { color: colors.blue },
  darkBlue: { color: colors.darkBlue },
  pink: { color: colors.pink },
  white: { color: colors.white },
  black: { color: colors.black },
  gold: { color: colors.gold },
  darkestBlue: { color: colors.darkestBlue },
  gray: { color: colors.gray },
  yellow: { color: colors.yellow },
  orange: { color: colors.orange },
  // fonts
  h1: { fontSize: sizes.h1 },
  h2: { fontSize: sizes.h2 },
  h3: { fontSize: sizes.h3 },
  h4: { fontSize: sizes.h4 },
  title: { fontSize: sizes.title },
  header: { fontSize: sizes.header },
  body: { fontSize: sizes.body },
  caption: { fontSize: sizes.caption },
  small: { fontSize: sizes.small },
  tiny: { fontSize: sizes.tiny },
});
