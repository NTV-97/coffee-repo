import { Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { DEFAULT_NAVBAR_HEIGHT, DEVICE, SCREEN_NAME, STATUS_BAR_HEIGHT } from 'config/constants';
import { colors, sizes } from 'config/theme';
import { Div, Divider, Text } from 'config/components';
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
    <ImageBackground source={images.backgroundIntro} style={styles.imageBackground}>
      <Div flex={1} backgroundColor={colors.whiteOpacity}>
        <Div mt={STATUS_BAR_HEIGHT + DEFAULT_NAVBAR_HEIGHT} flex={0.3} pt={sizes.base * 10}>
          <Div width={sizes.base * 15} height={sizes.base * 15} wrap="wrap" centerSelf>
            <Image source={images.logo} style={styles.imageLogo} resizeMode={'contain'} />
          </Div>
        </Div>
        <Div flex={1} center mt={sizes.base * 6}>
          <TouchableOpacity activeOpacity={0.7} onPress={onPressSignUp}>
            <Div
              green
              padding={[sizes.base, sizes.base * 6]}
              radius={sizes.base * 3}
              shadow
              borderWidth={0.5}>
              <Text semibold h3>
                Đăng Ký
              </Text>
            </Div>
          </TouchableOpacity>
          <Divider
            width={sizes.base * 30}
            margin={[sizes.base * 2, 0]}
            color={colors.black}
            height={sizes.base / 4}
          />
          <TouchableOpacity activeOpacity={0.7} onPress={onPressLogin}>
            <Div
              pink
              padding={[sizes.base, sizes.base * 4]}
              radius={sizes.base * 3}
              shadow
              borderWidth={0.5}>
              <Text h3 semibold>
                Đăng Nhập
              </Text>
            </Div>
          </TouchableOpacity>
          <Div flex={0.6} right endSelf mr={sizes.base * 2} mt={sizes.base * 12}>
            <Div>
              <Text h1 white semibold>
                DO YOU
              </Text>
              <Text biggest bold spacing={1}>
                REMEMBER
              </Text>
              <Text h1 semibold white>
                THE FIRST TIME?
              </Text>
            </Div>
          </Div>
        </Div>
      </Div>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  imageLogo: {
    width: '100%',
    height: '100%',
  },
});
