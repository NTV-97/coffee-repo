import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/**
 * Scale up/down the original height to new height (based on the screen height)
 * @param originalHeight the height of component or the font size
 * @returns scaled height
 */
export const responsiveHeight = (originalHeight: number) => {
  const ORIGINAL_SCREEN_HEIGHT_IN_DESIGN = 812;
  const percentage = (originalHeight / ORIGINAL_SCREEN_HEIGHT_IN_DESIGN) * 100;
  return hp(`${percentage}%`);
};

/**
 * Scale up/down the original width to new width (based on the screen width)
 * @param originalWidth the width of component or the font size
 * @returns scaled width
 */
export const responsiveWidth = (originalWidth: number, dimensionWidth: number) => {
  const ORIGINAL_SCREEN_WIDTH_IN_DESIGN = dimensionWidth || 375;
  const percentage = (originalWidth / ORIGINAL_SCREEN_WIDTH_IN_DESIGN) * 100;
  return wp(`${percentage}%`);
};
