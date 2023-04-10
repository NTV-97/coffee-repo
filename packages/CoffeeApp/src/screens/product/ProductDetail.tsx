import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BOTTOM_SPACE, DEVICE, SCREEN_NAME } from 'config/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigator/types';
import { AddToCartMutationVariables, useAddToCartMutation, useGetProductQuery } from 'graphql-hook';
import { AppLoading, Container, Div, Divider, Text } from 'config/components';
import { colors, sizes } from 'config/theme';
import { formatMoney } from '../../utils/formatMoney';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigationUtils } from 'config/utils';

const { PRODUCT_DETAIL, CART } = SCREEN_NAME;

export const ProductDetail: React.FC<
  NativeStackScreenProps<RootStackParamList, typeof PRODUCT_DETAIL>
> = ({ route }) => {
  const { data } = useGetProductQuery({
    variables: { id: route.params.productId },
  });
  const [addToCart, { loading }] = useAddToCartMutation({
    onCompleted() {
      navigationUtils.navigate(CART);
    },
    onError(error) {
      Alert.alert(error.message);
    },
  });
  const product = data?.getProduct;

  const price = formatMoney(product?.price ?? 0);
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState('');
  const [toppings, setToppings] = useState<string[]>([]);
  const [ice, setIce] = useState('Bình thường');
  const arrIce = ['Bình thường', 'Ít đá'];
  useEffect(() => {
    if (product?.details?.size) {
      setSize(product.details.size[0]?.name ?? '');
    }
  }, [product?.details?.size]);

  const onPressAddCart = () => {
    if (quantity === 0) {
      return Alert.alert('Số lượng không thể bằng 0');
    }
    const variables: AddToCartMutationVariables = {
      items: [
        {
          productId: route.params.productId ?? '',
          quantity,
          size,
          toppings,
        },
      ],
    };
    addToCart({ variables });
  };
  const renderItem = (item: string, type: 'size' | 'topping' | 'ice') => {
    const onPress = () => {
      if (type === 'size') {
        return setSize(item);
      }
      if (type === 'topping') {
        if (toppings.includes(item)) {
          return setToppings(toppings.filter((e) => e !== item));
        }
        return setToppings([...toppings, item]);
      }
      setIce(item);
    };
    const text = type === 'size' ? `Size ${item}` : item;
    const activated =
      type === 'size' ? size === item : type === 'topping' ? toppings.includes(item) : ice === item;
    return (
      <Div row center mt={sizes.base} key={item}>
        <TouchableOpacity onPress={onPress}>
          <Div
            center
            middle
            borderWidth={1.5}
            borderColor={colors.black}
            width={sizes.base * 3}
            height={sizes.base * 3}
            radius={sizes.base * 1.5}
            mr={sizes.base}>
            {activated && (
              <Div
                width={sizes.base * 2}
                height={sizes.base * 2}
                radius={sizes.base}
                backgroundColor={colors.blue}
              />
            )}
          </Div>
        </TouchableOpacity>
        <Text medium header>
          {text}
        </Text>
      </Div>
    );
  };
  return (
    <Div flex={1}>
      <Container
        isHeader
        isBack
        title={data?.getProduct?.name}
        backgroundColor={colors.brown}
        isScroll>
        <Divider color={colors.black} margin={[sizes.base * 2, 0]} />
        <Div row margin={[0, sizes.base * 2]}>
          <Div lightGray radius={sizes.radius * 2} flex={1}>
            <Image source={{ uri: product?.image ?? '' }} style={styles.image} />
          </Div>
          <Div endSelf flex={1} pl={sizes.base * 2}>
            <Text semibold header>
              Giá: {price} VND
            </Text>
            <Div row center mt={sizes.base}>
              <TouchableOpacity onPress={() => quantity > 0 && setQuantity(quantity - 1)}>
                <Div>
                  <Icon name="minus-circle" color={colors.black} size={sizes.base * 4} />
                </Div>
              </TouchableOpacity>
              <Div padding={[sizes.base / 2, sizes.base * 2]} white margin={[0, sizes.base]}>
                <Text>{quantity}</Text>
              </Div>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Div>
                  <Icon name="plus-circle" color={colors.black} size={sizes.base * 4} />
                </Div>
              </TouchableOpacity>
            </Div>
          </Div>
        </Div>
        <Div margin={sizes.base * 2}>
          <Text title semibold>
            Chọn size:
          </Text>
          {product?.details?.size?.map((e) => renderItem(e?.name ?? '', 'size'))}
        </Div>
        <Div margin={[0, sizes.base * 2]}>
          <Text title semibold>
            Thêm topping:
          </Text>
          {product?.details?.topping?.map((e) => renderItem(e?.name ?? '', 'topping')) ?? null}
        </Div>
        <Div margin={sizes.base * 2}>
          <Text title semibold>
            Chọn đá:
          </Text>
          {arrIce.map((e) => renderItem(e, 'ice'))}
        </Div>
      </Container>
      <Div margin={[0, sizes.base * 3, BOTTOM_SPACE]}>
        <TouchableOpacity onPress={onPressAddCart}>
          <Div
            width={DEVICE.WINDOW_WIDTH - sizes.base * 6}
            height={sizes.base * 5}
            radius={sizes.radius * 4}
            backgroundColor={colors.rustyOrange}
            center
            borderWidth={1}
            borderColor={colors.black}
            shadow
            middle>
            <Text bold header>
              Thêm vào giỏ hàng
            </Text>
          </Div>
        </TouchableOpacity>
      </Div>
      {loading && <AppLoading />}
    </Div>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: DEVICE.WINDOW_WIDTH / 2,
    resizeMode: 'contain',
  },
});
