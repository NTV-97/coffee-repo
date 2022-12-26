import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { DEFAULT_NAVBAR_HEIGHT, DEVICE, SCREEN_NAME, STATUS_BAR_HEIGHT } from 'config/constants';
import { colors, sizes } from 'config/theme';
import { Div, Text } from 'config/components';
import { images } from '../../assets';
import { navigationUtils } from 'config/utils';

const { WINDOW_WIDTH, WINDOW_HEIGHT } = DEVICE;
const { navigate } = navigationUtils;

export const Introduction: React.FC = () => {
  const onPressSignUp = () => {
    navigate(SCREEN_NAME.SIGN_UP);
  };

  const onPressLogin = () => {
    navigate(SCREEN_NAME.SIGN_IN);
  };

  return (
    <ImageBackground source={images.backgroundLogin} style={styles.imageBackground}>
      <Div mt={STATUS_BAR_HEIGHT + DEFAULT_NAVBAR_HEIGHT} ml={sizes.base * 2}>
        <Text white h1 medium>
          One cup of
        </Text>
        <Div mt={sizes.base / 2}>
          <Text white h1 medium>
            coffee a day
          </Text>
        </Div>
      </Div>
      <Div flex={1} center middle>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressLogin}>
          <Div
            backgroundColor={colors.grayOpacity}
            padding={[sizes.base * 2, sizes.base * 10]}
            radius={sizes.base * 3}>
            <Text bold h2 white>
              Đăng nhập
            </Text>
          </Div>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressSignUp}>
          <Div mt={sizes.base * 2}>
            <Text white header>
              Đăng ký
            </Text>
          </Div>
        </TouchableOpacity>
      </Div>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
});
