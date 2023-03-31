import { TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { Div, Text } from './base';
import { DEFAULT_NAVBAR_HEIGHT, DEVICE } from '../constants';
import { sizes, colors } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigationUtils } from '../utils';
import { fonts, images } from 'coffeeapp';

const { SCREEN_WIDTH } = DEVICE;

export interface IPropsHeader {
  isBack?: boolean;
  isSearch?: boolean;
  textSearch?: string;
  onChangeSearch?: (text: string) => void;
  onSearch?: () => void;
}

export const Header: React.FC<IPropsHeader> = ({
  isBack,
  isSearch,
  textSearch = '',
  onChangeSearch = () => null,
  onSearch = () => null,
}) => {
  const { goBack } = navigationUtils;
  const [isShowSearch, setIsShowSearch] = useState(false);

  const _onSearch = () => {
    isShowSearch ? onSearch() : setIsShowSearch(true);
  };
  const renderBackButton = () => {
    return isBack ? (
      <Div flex={0.5}>
        <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
          <Icon name="arrow-back-ios" size={sizes.base * 3} color={colors.white} />
        </TouchableOpacity>
      </Div>
    ) : (
      <Div flex={0.5} />
    );
  };
  const renderSearchButton = () => {
    return isSearch ? (
      <Div flex={0.5} alignRight>
        <TouchableOpacity onPress={_onSearch} activeOpacity={0.7}>
          <Icon name="search" size={sizes.base * 3} color={colors.white} />
        </TouchableOpacity>
      </Div>
    ) : (
      <Div flex={0.5} />
    );
  };
  const renderSearch = () => {
    return isShowSearch ? (
      <Div flex={4}>
        <TextInput
          value={textSearch}
          onChangeText={onChangeSearch}
          style={styles.input}
          placeholder="Search"
          returnKeyType="search"
          allowFontScaling={false}
          placeholderTextColor={colors.borderGray}
          onSubmitEditing={onSearch}
        />
      </Div>
    ) : (
      <Div flex={2} center>
        <Image source={images.logo} style={styles.image} />
      </Div>
    );
  };
  return (
    <Div
      width={SCREEN_WIDTH}
      height={DEFAULT_NAVBAR_HEIGHT}
      row
      padding={[sizes.base, sizes.base * 2]}
      center
      backgroundColor={colors.whisper}>
      {renderBackButton()}
      {renderSearch()}
      {renderSearchButton()}
    </Div>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: sizes.radius * 3,
    paddingHorizontal: sizes.base,
    fontSize: sizes.body,
    fontFamily: fonts.robotoRegular,
  },
  image: {
    height: DEFAULT_NAVBAR_HEIGHT,
    aspectRatio: 1,
  },
});
