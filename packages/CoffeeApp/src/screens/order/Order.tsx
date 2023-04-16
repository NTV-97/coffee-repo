import { FlatList, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigator/types';
import { BOTTOM_SPACE, DEFAULT_NAVBAR_HEIGHT, SCREEN_NAME } from 'config/constants';
import { Container, Div, Text } from 'config/components';
import { colors, sizes } from 'config/theme';
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from 'graphql-hook';
import { Order } from 'graphql-hook';
import { OrderStatus } from 'graphql-hook';
import { formatMoney } from '../../utils/formatMoney';

const { ORDER_ADMIN } = SCREEN_NAME;

export const AllOrder: React.FC<
  NativeStackScreenProps<RootStackParamList, typeof ORDER_ADMIN>
> = () => {
  const { data, refetch, loading } = useGetAllOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation({
    onCompleted(_data) {
      if (_data) {
        refetch();
      }
    },
  });
  const orders = data?.getAllOrders;

  const onPresChangeStatus = (id: string, _status: OrderStatus) => {
    const status =
      _status === OrderStatus.Processing ? OrderStatus.Completed : OrderStatus.Processing;
    updateStatus({
      variables: {
        id,
        status,
      },
    });
  };

  const renderItem = ({ item }: { item: Order }) => {
    const statusString =
      item.status === OrderStatus.Processing
        ? 'Đang làm'
        : item?.status === OrderStatus.Pending
        ? 'Đợi xác nhận'
        : item?.status === OrderStatus.Completed
        ? 'Hoàn thành'
        : 'Đã huỷ';
    const stringChangeStatus =
      item.status === OrderStatus.Processing
        ? 'Bấm để hoàn thành'
        : OrderStatus.Pending
        ? 'Bấm để xác nhận'
        : '';
    return (
      <Div
        margin={[sizes.base, sizes.base * 2]}
        padding={sizes.base}
        lightGray
        radius={sizes.radius}>
        <Div>
          <Text title semibold>
            Mã đơn: {item.id.slice(0, 10) ?? ''}
          </Text>
        </Div>
        <Div>
          <Text title semibold>
            Sản phẩm
          </Text>
          {item.items.map((e, index) => (
            <Div key={index}>
              <Text header regular numberOfLines={1}>
                Tên: {e.product?.name}
              </Text>
              <Text header regular>
                Số lượng: {e.quantity}
              </Text>
              <Text header regular>
                Đơn giá: {formatMoney(e.price)} VND
              </Text>
              <Text header regular>
                Size: {e.size}
              </Text>
              <Text header regular>
                Toppings: {e.toppings?.join(', ')}
              </Text>
            </Div>
          ))}
        </Div>
        <Div mt={sizes.base}>
          <Text regular header>
            Tên KH: {item.user.name}
          </Text>
          <Text header medium>
            Số điện thoại: {item.user.phoneNumber ?? ''}
          </Text>
          <Text header medium>
            Địa chỉ: {item.user.address ?? ''}
          </Text>
          <Text header medium>
            Giá: {formatMoney(item.totalPrice)} VND
          </Text>
          <Text header medium>
            Ghi chú: {item.note}
          </Text>
          <Div row center>
            <Text header medium>
              Trạng thái:
            </Text>
            <Text header semibold>
              {' ' + statusString}
            </Text>
            {item.status === OrderStatus.Cancelled ||
            item.status === OrderStatus.Completed ? null : (
              <Div flex={1} alignRight>
                <TouchableOpacity onPress={() => onPresChangeStatus(item.id, item.status)}>
                  <Div padding={sizes.base} blue radius={sizes.radius}>
                    <Text>{stringChangeStatus}</Text>
                  </Div>
                </TouchableOpacity>
              </Div>
            )}
          </Div>
        </Div>
      </Div>
    );
  };
  return (
    <Container backgroundColor={colors.brown} isHeader title="Đơn hàng">
      <Div mt={sizes.base} pb={BOTTOM_SPACE + DEFAULT_NAVBAR_HEIGHT} flex={1}>
        <FlatList
          //@ts-ignore
          data={orders ?? []}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          onRefresh={() => refetch()}
          refreshing={loading}
        />
      </Div>
    </Container>
  );
};
