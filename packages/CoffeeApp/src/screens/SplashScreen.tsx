import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { images } from '../assets';
import { constants } from 'config';
const {
  DEVICE: { WINDOW_WIDTH, WINDOW_HEIGHT },
} = constants;

export const SplashScreen = () => {
  return <Image style={styles.image} source={images.splash} />;
};

const styles = StyleSheet.create({
  image: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
});
