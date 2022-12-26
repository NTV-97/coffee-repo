import { Platform } from 'react-native';
import { isIphoneX as isIPhoneX } from 'react-native-iphone-x-helper';

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const isIphoneX = isIPhoneX();
