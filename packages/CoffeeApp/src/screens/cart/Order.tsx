import { FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors, sizes } from 'config/theme';
import { Container, Div, Text } from 'config/components';
import { BOTTOM_SPACE, DEFAULT_NAVBAR_HEIGHT, DEVICE, SCREEN_NAME } from 'config/constants';
import { useClearCartMutation, useGetCartQuery, usePlaceOrderMutation } from 'graphql-hook';
import { formatMoney } from '../../utils/formatMoney';
import { CartItem } from 'graphql-hook';
import { useGetUserQuery } from 'graphql-hook';
import { navigationUtils } from 'config/utils';
import { fonts } from '../../assets';
const { UPDATE_USER_INFO, ORDER_STATUS } = SCREEN_NAME;

export const Order: React.FC = () => {
  const { data } = useGetCartQuery();
  const { data: user } = useGetUserQuery();
  const [clearCart] = useClearCartMutation();
  const [placeOrder] = usePlaceOrderMutation({
    onCompleted: (_data) => {
      clearCart();
      navigationUtils.replace(ORDER_STATUS, { idOrder: _data.placeOrder?.id ?? '' });
    },
  });
  const userInfo = user?.getUser;
  const cart = data?.getCart;

  const [note, setNote] = useState('');

  const onPressOrder = () => {
    placeOrder({
      variables: {
        idCart: data?.getCart?.id ?? '',
        note,
      },
    });
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    return (
      <Div
        white
        radius={sizes.radius}
        margin={[sizes.base, sizes.base * 2]}
        row
        overflow="hidden"
        padding={sizes.base}>
        <Div width={sizes.base * 14} height={sizes.base * 16}>
          <Image source={{ uri: item.product?.image ?? '' }} style={styles.image} />
        </Div>
        <Div ml={sizes.base * 2}>
          <Text header semibold black>
            {item.product?.name ?? ''}
          </Text>
          <Div mt={sizes.base}>
            <Text medium>
              Size: <Text>{item.size ?? ''}</Text>
            </Text>
            <Text medium>
              Toppings:{' '}
              <Text>{item.toppings?.length ? item.toppings?.join(', ') : 'Không có'}</Text>
            </Text>
            <Text medium>
              Số lượng: <Text>{item.quantity}</Text>
            </Text>
          </Div>
          <Div alignRight row flex={1}>
            <Text medium title>
              Giá:{' '}
              <Text title orange>
                {formatMoney(item.price)} VND
              </Text>
            </Text>
          </Div>
        </Div>
      </Div>
    );
  };
  return (
    <Container backgroundColor={colors.brown} isHeader title="Thanh toán" isBack>
      <Div
        margin={[sizes.base * 2, sizes.base * 2, 0, sizes.base * 2]}
        radius={sizes.radius * 2}
        backgroundColor={colors.goldenYellow}
        padding={sizes.base * 2}>
        <Div>
          <Text semibold header>
            Thông tin nhận hàng
          </Text>
        </Div>
        <Div row mt={sizes.base}>
          <Text semibold header>
            Họ và tên: {userInfo?.name ?? ''}
          </Text>
        </Div>
        <Div row mt={sizes.base}>
          <Text semibold header>
            Email: {userInfo?.email ?? ''}
          </Text>
        </Div>
        <Div row mt={sizes.base}>
          <Text semibold header>
            Số điện thoại: {userInfo?.phoneNumber ?? ''}
          </Text>
        </Div>
        <Div row mt={sizes.base}>
          <Text semibold header>
            Địa chỉ: {userInfo?.address ?? ''}
          </Text>
          <Div flex={1} alignRight>
            <TouchableOpacity onPress={() => navigationUtils.navigate(UPDATE_USER_INFO)}>
              <Div
                padding={[sizes.base, sizes.base * 3]}
                backgroundColor={colors.lightOrange}
                radius={sizes.radius * 3}>
                <Text semibold>Sửa</Text>
              </Div>
            </TouchableOpacity>
          </Div>
        </Div>
      </Div>
      <Div margin={[sizes.base, 0, 0]} flex={1}>
        <FlatList
          data={cart?.items ?? []}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </Div>
      <Div mb={BOTTOM_SPACE}>
        <Div
          white
          height={DEFAULT_NAVBAR_HEIGHT}
          margin={[0, sizes.base * 2]}
          radius={sizes.radius}>
          <TextInput
            placeholder="Ghi chú"
            onChangeText={setNote}
            multiline
            numberOfLines={3}
            onBlur={(e) => setNote(e.nativeEvent.text)}
            value={note}
            autoCapitalize="none"
            style={styles.textInput}
            allowFontScaling={false}
            placeholderTextColor={colors.gray}
          />
        </Div>
        <Div
          margin={[sizes.base, sizes.base * 2]}
          borderWidth={1}
          borderColor={colors.black}
          radius={sizes.radius}
          backgroundColor={colors.rustyOrange}
          padding={sizes.base}>
          <Text medium title>
            Tổng tiền: <Text title>{formatMoney(cart?.totalPrice ?? 0)} VND</Text>
          </Text>
        </Div>
        <Div mt={sizes.base} center>
          <TouchableOpacity onPress={onPressOrder}>
            <Div
              green
              radius={sizes.radius * 3}
              padding={[sizes.base, sizes.base * 3]}
              width={sizes.base * 20}
              center
              middle>
              <Text header bold>
                Thanh toán
              </Text>
            </Div>
          </TouchableOpacity>
        </Div>
      </Div>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  textInput: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    fontFamily: fonts.robotoRegular,
    color: colors.black,
    fontSize: sizes.body,
  },
});
