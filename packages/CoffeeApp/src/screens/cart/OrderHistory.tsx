import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Div, Divider, Text } from 'config/components';
import { colors, sizes } from 'config/theme';
import { images } from '../../assets';
import { Order, useGetOrdersQuery } from 'graphql-hook';

export const OrderHistory: React.FC = () => {
  const { data } = useGetOrdersQuery();
  const orders = data?.getOrders;
  const [list, setList] = useState<Order[]>([]);
  const [cancelActivated, setCancelActivated] = useState(false);
  useEffect(() => {
    let _list: Order[] = [];
    if (cancelActivated) {
      _list = orders?.filter((e) => e.status === 'CANCELLED') ?? [];
    } else {
      _list = orders?.filter((e) => e.status !== 'CANCELLED') ?? [];
    }
    setList(_list);
  }, [orders, cancelActivated]);

  const renderItem = ({ item, index }: { item: Order; index: number }) => {
    const statusString =
      item.status === 'PROCESSING'
        ? 'Đang làm'
        : item.status === 'PENDING'
        ? 'Đợi xác nhận'
        : item.status === 'COMPLETED'
        ? 'Hoàn thành'
        : 'Đã huỷ';
    return (
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
              Mã đơn: {item.id.slice(0, 10) ?? ''}
            </Text>
          </Div>
        </Div>
        <Div mt={sizes.base * 2}>
          <Text header semibold>
            Tên KH: {item.user.name ?? ''}
          </Text>
          <Text header semibold>
            Số điện thoại: {item.user.phoneNumber ?? ''}
          </Text>
          <Text header semibold>
            Địa chỉ: {item.user.address ?? ''}
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
    );
  };
  return (
    <Container backgroundColor={colors.brown} isHeader title="Lịch sử đơn hàng" isBack>
      <Divider color={colors.black} mt={sizes.base * 2} />
      <Div row mt={sizes.base * 2}>
        <Div
          flex={1}
          borderColor={colors.black}
          borderWidth={1}
          padding={[sizes.base, 0]}
          backgroundColor={cancelActivated ? colors.white : colors.pink}>
          <TouchableOpacity onPress={() => setCancelActivated(false)}>
            <Div center>
              <Text>Đã đặt</Text>
            </Div>
          </TouchableOpacity>
        </Div>
        <Div
          flex={1}
          borderColor={colors.black}
          borderWidth={1}
          padding={[sizes.base, 0]}
          backgroundColor={cancelActivated ? colors.pink : colors.white}>
          <TouchableOpacity onPress={() => setCancelActivated(true)}>
            <Div center>
              <Text>Đã huỷ</Text>
            </Div>
          </TouchableOpacity>
        </Div>
      </Div>
      <Div flex={1}>
        <FlatList data={list} keyExtractor={(item) => item.id} renderItem={renderItem} />
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
