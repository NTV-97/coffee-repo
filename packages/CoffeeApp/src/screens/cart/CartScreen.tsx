import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Container, Div, Text } from 'config/components';
import {
  CartItem,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
} from 'graphql-hook';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, sizes } from 'config/theme';
import { formatMoney } from '../../utils/formatMoney';
import { BOTTOM_SPACE, DEFAULT_NAVBAR_HEIGHT, SCREEN_NAME } from 'config/constants';
import { navigationUtils } from 'config/utils';
import { useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '@navigator/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const { ORDER, CART } = SCREEN_NAME;

export const CartScreen: React.FC<NativeStackScreenProps<RootStackParamList, typeof CART>> = () => {
  const { data, refetch } = useGetCartQuery();
  const isFocused = useIsFocused();
  const [updateCartItem] = useUpdateCartItemMutation({
    onCompleted: (_data) => {
      if (_data) {
        refetch();
      }
    },
  });
  const [removeFromCart] = useRemoveFromCartMutation({
    onCompleted: (_data) => {
      if (_data) {
        refetch;
      }
    },
  });
  const cart = data?.getCart;
  const [cartItems, setCartItems] = useState(cart?.items ?? []);

  useEffect(() => {
    if (cart?.items) {
      setCartItems(cart.items);
    }
  }, [cart?.items]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const renderItem = ({ item, index }: { item: CartItem; index: number }) => {
    let quantity = item.quantity;
    const onPressQuantity = (type: 'plus' | 'minus') => {
      if (type === 'plus') {
        quantity = quantity + 1;
      } else {
        if (item.quantity > 1) {
          quantity = quantity - 1;
        } else {
          return removeFromCart({
            variables: {
              cartItemIndex: index,
            },
          });
        }
      }
      updateCartItem({
        variables: {
          itemsUpdate: [
            {
              cartItemIndex: index,
              productId: item.product?.id ?? '',
              quantity,
              size: item.size ?? '',
              toppings: item.toppings,
            },
          ],
        },
      });
    };
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
          </Div>
          <Div alignRight row flex={1}>
            <Text medium title>
              Giá:{' '}
              <Text title orange>
                {formatMoney(item.price)} VND
              </Text>
            </Text>
          </Div>
          <Div row alignRight>
            <Text semibold header>
              Số lượng:{' '}
            </Text>
            <TouchableOpacity onPress={() => onPressQuantity('minus')}>
              <Div>
                <Icon name="minus-circle" color={colors.black} size={sizes.base * 2.5} />
              </Div>
            </TouchableOpacity>
            <Div
              padding={[0, sizes.base * 2]}
              borderWidth={1}
              borderColor={colors.black}
              margin={[0, sizes.base]}>
              <Text>{item.quantity}</Text>
            </Div>
            <TouchableOpacity onPress={() => onPressQuantity('plus')}>
              <Div>
                <Icon name="plus-circle" color={colors.black} size={sizes.base * 2.5} />
              </Div>
            </TouchableOpacity>
          </Div>
        </Div>
      </Div>
    );
  };
  return (
    <Container backgroundColor={colors.brown} isHeader title="Giỏ hàng">
      <Div margin={[sizes.base, 0, 0]} flex={1}>
        <FlatList
          data={cartItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </Div>
      <Div mb={DEFAULT_NAVBAR_HEIGHT + BOTTOM_SPACE}>
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
        <Div margin={[sizes.base, 0, sizes.base * 2, 0]} center>
          <TouchableOpacity onPress={() => navigationUtils.navigate(ORDER)}>
            <Div
              green
              radius={sizes.radius * 3}
              padding={[sizes.base, sizes.base * 3]}
              width={sizes.base * 20}
              center
              middle>
              <Text header bold>
                Đặt hàng
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
});
