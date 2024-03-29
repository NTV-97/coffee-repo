import { TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { Container, Div, Text } from 'config/components';
import { colors, sizes } from 'config/theme';
import { UserRole, useGetUserQuery } from 'graphql-hook';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigationUtils, storage } from 'config/utils';
import { SCREEN_NAME } from 'config/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigator/types';
import { Context } from 'config/context';

const { UPDATE_USER_INFO, SETTING, ORDER_HISTORY } = SCREEN_NAME;

export const SettingScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, typeof SETTING>
> = () => {
  const { setToken } = useContext(Context);
  const { data } = useGetUserQuery();
  const user = data?.getUser;
  const onPressSignOut = () => {
    storage.clear();
    setToken('');
  };
  return (
    <Container backgroundColor={colors.brown}>
      <Div center>
        <Text title bold>
          Thông tin cá nhân
        </Text>
      </Div>
      <Div
        margin={sizes.base * 2}
        radius={sizes.radius * 2}
        backgroundColor={colors.mistyRose}
        padding={sizes.base * 2}>
        <Div row>
          <Text semibold header>
            Họ và tên: {user?.name ?? ''}
          </Text>
        </Div>
        <Div row mt={sizes.base}>
          <Text semibold header>
            Email: {user?.email ?? ''}
          </Text>
        </Div>
        <Div row mt={sizes.base}>
          <Text semibold header>
            Số điện thoại: {user?.phoneNumber ?? ''}
          </Text>
        </Div>
        <Div row mt={sizes.base}>
          <Text semibold header>
            Địa chỉ: {user?.address ?? ''}
          </Text>
        </Div>
      </Div>
      {user?.role === UserRole.User ? (
        <TouchableOpacity onPress={() => navigationUtils.navigate(ORDER_HISTORY)}>
          <Div
            row
            padding={[sizes.base, sizes.base * 2]}
            backgroundColor={colors.almond}
            margin={[sizes.base * 2, sizes.base * 2, 0]}
            center
            radius={sizes.radius * 2}>
            <Icon name="text-snippet" size={sizes.base * 5} color={colors.black} />
            <Div ml={sizes.base * 2}>
              <Text header semibold>
                Đơn hàng
              </Text>
            </Div>
          </Div>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity onPress={() => navigationUtils.navigate(UPDATE_USER_INFO)}>
        <Div
          row
          padding={[sizes.base, sizes.base * 2]}
          backgroundColor={colors.almond}
          margin={sizes.base * 2}
          center
          radius={sizes.radius * 2}>
          <Icon name="settings" size={sizes.base * 5} color={colors.black} />
          <Div ml={sizes.base * 2}>
            <Text header semibold>
              Sửa thông tin cá nhân
            </Text>
          </Div>
        </Div>
      </TouchableOpacity>
      <Div margin={[sizes.base * 30, sizes.base * 12, 0]}>
        <TouchableOpacity onPress={onPressSignOut}>
          <Div
            row
            padding={[sizes.base, sizes.base * 2]}
            pink
            shadow
            center
            middle
            borderWidth={1}
            borderColor={colors.black}
            radius={sizes.radius * 6}>
            <Icon name="logout" size={sizes.base * 4} color={colors.black} />
            <Div ml={sizes.base}>
              <Text title semibold>
                Đăng xuất
              </Text>
            </Div>
          </Div>
        </TouchableOpacity>
      </Div>
    </Container>
  );
};
