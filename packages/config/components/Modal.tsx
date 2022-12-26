import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import RNModal from 'react-native-modal';
import { DEVICE } from '../constants';
import { sizes } from '../theme';
import { Div } from './base';

interface IPropsModal {
  isVisible: boolean;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  children: React.ReactNode;
}

const { WINDOW_WIDTH, WINDOW_HEIGHT } = DEVICE;

export const Modal = memo(
  ({
    isVisible,
    onBackdropPress = () => null,
    onBackButtonPress = () => null,
    children,
  }: IPropsModal) => {
    return (
      <RNModal
        isVisible={isVisible}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        hasBackdrop={true}
        backdropOpacity={0.2}
        animationOutTiming={500}
        backdropTransitionOutTiming={500}
        deviceHeight={WINDOW_HEIGHT}
        deviceWidth={WINDOW_WIDTH}
        onBackdropPress={onBackdropPress}
        onBackButtonPress={onBackButtonPress}
        avoidKeyboard
        style={styles.resetStyleModal}>
        <Div white>{children}</Div>
      </RNModal>
    );
  },
);

const styles = StyleSheet.create({
  resetStyleModal: {
    margin: 0,
    padding: 0,
    paddingHorizontal: sizes.base,
  },
});
