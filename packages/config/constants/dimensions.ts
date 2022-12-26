import { Dimensions } from 'react-native';
import { getStatusBarHeight, getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import { sizes } from '../theme';

export const DEVICE = {
  SCREEN_WIDTH: Dimensions.get('screen').width,
  SCREEN_HEIGHT: Dimensions.get('screen').height,
  WINDOW_WIDTH: Dimensions.get('window').width,
  WINDOW_HEIGHT: Dimensions.get('window').height,
};

export const STATUS_BAR_HEIGHT = getStatusBarHeight();
export const DEFAULT_NAVBAR_HEIGHT = 60;
export const BOTTOM_SPACE = isIphoneX() ? getBottomSpace() / 1.5 : sizes.base * 2;
