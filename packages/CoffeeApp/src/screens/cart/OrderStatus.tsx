import { Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Container, Div, Divider, Text } from 'config/components';
import { colors, sizes } from 'config/theme';
import { images } from '../../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigator/types';
import { SCREEN_NAME } from 'config/constants';
import { useGetOrderLazyQuery } from 'graphql-hook';

const { ORDER_STATUS } = SCREEN_NAME;

export const OrderStatus: React.FC<
  NativeStackScreenProps<RootStackParamList, typeof ORDER_STATUS>
> = ({ route }) => {
  const [getOrder, { data }] = useGetOrderLazyQuery();

  useEffect(() => {
    if (route.params.idOrder) {
      getOrder({ variables: { id: route.params.idOrder } });
    }
  }, [route.params.idOrder]);

  const statusString =
    data?.getOrder?.status === 'PROCESSING'
      ? 'Đang làm'
      : data?.getOrder?.status === 'PENDING'
      ? 'Đợi xác nhận'
      : data?.getOrder?.status === 'COMPLETED'
      ? 'Hoàn thành'
      : 'Đã huỷ';
  return (
    <Container backgroundColor={colors.brown} isHeader title="Trạng thái đơn hàng" isBack>
      <Divider color={colors.black} mt={sizes.base * 2} />
      <Div
        margin={sizes.base * 2}
        padding={sizes.base}
        radius={sizes.radius * 2}
        backgroundColor={colors.whisper}>
        <Div row>
          <Div
            width={sizes.base * 10}
            height={sizes.base * 10}
            radius={sizes.base * 5}
            overflow="hidden">
            <Image source={images.logo} style={styles.image} />
          </Div>
          <Div endSelf pl={sizes.base * 4}>
            <Text header semibold>
              Mã đơn: {data?.getOrder?.id.slice(0, 10) ?? ''}
            </Text>
          </Div>
        </Div>
        <Div mt={sizes.base * 2}>
          <Text header semibold>
            Tên KH: {data?.getOrder?.user.name ?? ''}
          </Text>
          <Text header semibold>
            Số điện thoại: {data?.getOrder?.user.phoneNumber ?? ''}
          </Text>
          <Text header semibold>
            Địa chỉ: {data?.getOrder?.user.address ?? ''}
          </Text>
          <Div mt={sizes.base * 2} row>
            <Text header semibold>
              Trạng thái:
            </Text>
            <Div flex={1} ml={sizes.base * 2}>
              <Text header medium>
                {statusString}
              </Text>
            </Div>
          </Div>
        </Div>
      </Div>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
