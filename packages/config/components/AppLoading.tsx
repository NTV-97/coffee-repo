import React from 'react';
import { ActivityIndicator } from 'react-native';
import { DEVICE } from '../constants';
import { colors } from '../theme';
import { Div } from './base';

const { SCREEN_WIDTH, SCREEN_HEIGHT } = DEVICE;

export const AppLoading: React.FC = () => {
  return (
    <Div
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      absolute
      zIndex={99}
      center
      middle
      backgroundColor={colors.blackOpacity}>
      <ActivityIndicator color={colors.brown} size="large" />
    </Div>
  );
};
