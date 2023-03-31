import { dimension } from '../utils';
const { responsiveHeight } = dimension;

export const sizes = {
  base: responsiveHeight(8),
  radius: responsiveHeight(6),
  h1: responsiveHeight(26),
  h2: responsiveHeight(24),
  h3: responsiveHeight(22),
  h4: responsiveHeight(20),
  title: responsiveHeight(18),
  header: responsiveHeight(16),
  body: responsiveHeight(14),
  caption: responsiveHeight(12),
  small: responsiveHeight(10),
  tiny: responsiveHeight(8),
  biggest: responsiveHeight(46),
};
