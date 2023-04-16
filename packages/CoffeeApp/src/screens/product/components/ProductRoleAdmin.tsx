import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Div, Text } from 'config/components';
import { colors, sizes } from 'config/theme';
import {
  Exact,
  GetProductsQuery,
  Product,
  useDeleteProductMutation,
  useGetProductsQuery,
} from 'graphql-hook';
import { formatMoney } from '../../../utils/formatMoney';
import { ApolloQueryResult } from '@apollo/client';
import { BOTTOM_SPACE, DEVICE, SCREEN_NAME } from 'config/constants';
import { navigationUtils } from 'config/utils';

const { UPDATE_PRODUCT, CREATE_PRODUCT } = SCREEN_NAME;

export const ProductRoleAdmin: React.FC<{
  product: Product[];
  refetch?: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<GetProductsQuery>>;
  idCategory: string;
}> = ({ product, idCategory, refetch }) => {
  const [deleteProduct] = useDeleteProductMutation({
    onCompleted(_data) {
      if (_data && refetch) {
        refetch();
      }
    },
  });

  const onPressCreate = () => {
    navigationUtils.navigate(CREATE_PRODUCT, { idCategory, refetch });
  };
  const renderItemProduct = ({ item, index }: { item: Product; index: number }) => {
    return (
      <Div
        lightGray
        mb={sizes.base * 2}
        row
        height={DEVICE.SCREEN_HEIGHT / 6}
        overflow="hidden"
        radius={sizes.radius * 3}>
        <Div width={sizes.base * 14} height={'100%'} overflow="hidden">
          <Image
            source={{
              uri: item.image ?? '',
            }}
            style={styles.image}
          />
        </Div>

        <Div padding={sizes.base} flex={1}>
          <Text semibold header numberOfLines={1}>
            Tên: {item.name}
          </Text>
          <Div>
            <Text semibold header numberOfLines={2}>
              Mô tả: {item.description}
            </Text>
          </Div>
          <Text semibold header>
            Giá: {formatMoney(item.price)} VND
          </Text>
          <Div row flex={1}>
            <Div endSelf>
              <TouchableOpacity
                onPress={() =>
                  navigationUtils.navigate(UPDATE_PRODUCT, {
                    idProduct: item.id,
                  })
                }>
                <Div row center>
                  <Icon name="edit" size={sizes.base * 3} color={colors.blue} />
                  <Div ml={sizes.base}>
                    <Text medium blue>
                      Chỉnh sửa
                    </Text>
                  </Div>
                </Div>
              </TouchableOpacity>
            </Div>
            <Div ml={sizes.base * 3} endSelf>
              <TouchableOpacity
                onPress={() =>
                  deleteProduct({
                    variables: {
                      id: item.id,
                    },
                  })
                }>
                <Div row center>
                  <Icon name="trash" size={sizes.base * 3} color={colors.pink} />
                  <Div ml={sizes.base}>
                    <Text pink semibold>
                      Xoá
                    </Text>
                  </Div>
                </Div>
              </TouchableOpacity>
            </Div>
          </Div>
        </Div>
      </Div>
    );
  };
  return (
    <Div margin={[sizes.base * 2, sizes.base]} flex={1}>
      <FlatList
        data={product}
        keyExtractor={(item) => item.id}
        renderItem={renderItemProduct}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
      <Div mb={BOTTOM_SPACE}>
        <Div margin={[0, sizes.base * 2]}>
          <TouchableOpacity onPress={onPressCreate}>
            <Div blue padding={sizes.base * 2} radius={sizes.radius * 2} center middle>
              <Text bold header white>
                Thêm sản phẩm
              </Text>
            </Div>
          </TouchableOpacity>
        </Div>
      </Div>
    </Div>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
