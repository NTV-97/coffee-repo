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
  title?: string;
  onChangeSearch?: (text: string) => void;
  onSearch?: () => void;
}

export const Header: React.FC<IPropsHeader> = ({
  isBack,
  isSearch,
  textSearch = '',
  title,
  onChangeSearch = () => null,
  onSearch = () => null,
}) => {
  const { goBack } = navigationUtils;
  const [isShowSearch, setIsShowSearch] = useState(true);

  const _onSearch = () => {
    isShowSearch ? onSearch() : setIsShowSearch(true);
  };
  const renderBackButton = () => {
    return isBack ? (
      <Div flex={0.5}>
        <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
          <Div
            height={'100%'}
            width={DEFAULT_NAVBAR_HEIGHT}
            backgroundColor={colors.grayOpacity}
            center
            radius={sizes.radius * 3}
            middle>
            <Icon name="arrow-back-ios" size={sizes.base * 3} color={colors.white} />
          </Div>
        </TouchableOpacity>
      </Div>
    ) : null;
  };
  const renderSearchButton = () => {
    return isSearch ? (
      <Div>
        <TouchableOpacity onPress={_onSearch} activeOpacity={0.7}>
          <Div
            height={'100%'}
            width={DEFAULT_NAVBAR_HEIGHT}
            backgroundColor={colors.grayOpacity}
            center
            radius={sizes.radius * 3}
            middle>
            <Icon name="search" size={sizes.base * 4} color={colors.white} />
          </Div>
        </TouchableOpacity>
      </Div>
    ) : (
      <Div flex={0.5} />
    );
  };
  const renderSearch = () => {
    return isShowSearch && isSearch ? (
      <Div flex={4}>
        <TextInput
          value={textSearch}
          onChangeText={onChangeSearch}
          style={styles.input}
          placeholder="Tìm kiếm"
          returnKeyType="search"
          allowFontScaling={false}
          placeholderTextColor={colors.darkOpacity}
          onSubmitEditing={onSearch}
        />
      </Div>
    ) : (
      <Div flex={4}>
        <Text black bold title>
          {title}
        </Text>
      </Div>
    );
  };
  return (
    <Div
      width={SCREEN_WIDTH - sizes.base * 4}
      height={DEFAULT_NAVBAR_HEIGHT}
      row
      margin={[0, sizes.base * 2]}
      center
      radius={sizes.radius * 3}
      overflow="hidden"
      backgroundColor={colors.grayOpacity}>
      {renderBackButton()}
      {renderSearchButton()}
      {renderSearch()}
    </Div>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: sizes.base,
    fontSize: sizes.body,
    fontFamily: fonts.robotoRegular,
    color: colors.darkOpacity,
  },
  image: {
    height: DEFAULT_NAVBAR_HEIGHT,
    aspectRatio: 1,
  },
});
