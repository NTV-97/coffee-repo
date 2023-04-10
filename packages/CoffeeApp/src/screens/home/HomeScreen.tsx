import React, { useEffect, useState } from 'react';
import { navigationUtils, storage } from 'config/utils';
import { Container, Div, Text, Header, Divider } from 'config/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamsList, RootStackParamList } from '@navigator/types';
import { BOTTOM_SPACE, DEFAULT_NAVBAR_HEIGHT, DEVICE, SCREEN_NAME } from 'config/constants';
import { images } from '../../assets';
import { colors, sizes } from 'config/theme';
import {
  Category,
  GetCategoriesQueryResult,
  Product,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from 'graphql-hook';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const { HOME, PRODUCT_DETAIL, PRODUCT_BY_CATEGORY } = SCREEN_NAME;

export const HomeScreen: React.FC<NativeStackScreenProps<RootStackParamList, typeof HOME>> = ({
  navigation,
  route,
}) => {
  const { data } = useGetCategoriesQuery();
  const { data: dataProducts } = useGetProductsQuery();

  // useEffect(() => {
  //   storage.clear();
  // }, [])

  const [textSearch, setTextSearch] = useState('');
  const onChangeSearch = (text: string) => {
    setTextSearch(text);
  };

  const onPressCategory = (categoryId: string) => {
    const filterProductById = dataProducts?.getProducts?.filter(
      (e) => e?.category.id === categoryId,
    );
    navigationUtils.navigate(PRODUCT_BY_CATEGORY, { product: filterProductById });
  };

  const renderItemCategory = ({ item, index }: { item: Category; index: number }) => {
    return (
      <TouchableOpacity onPress={() => onPressCategory(item.id)}>
        <Div
          lightGray
          mt={sizes.base}
          padding={[sizes.base, 0]}
          center
          width={sizes.base * 10.5}
          ml={sizes.base}
          radius={sizes.radius * 3}>
          <Image
            source={{
              uri: item.image ?? '',
            }}
            style={styles.imageCategory}
          />
          <Text>{item.name}</Text>
        </Div>
      </TouchableOpacity>
    );
  };
  const renderItemProduct = ({ item, index }: { item: Product; index: number }) => {
    const isEven = index % 2 === 0;
    return (
      <TouchableOpacity
        onPress={() => navigationUtils.navigate(PRODUCT_DETAIL, { productId: item.id })}>
        <Div
          width={DEVICE.WINDOW_WIDTH / 2 - sizes.base * 1.5}
          ml={!isEven ? sizes.base : 0}
          blue
          lightGray
          radius={sizes.radius * 3}
          mb={sizes.base}
          pb={sizes.base}
          overflow="hidden"
          center>
          <Image
            source={{
              uri: item.image ?? '',
            }}
            style={styles.imageProduct}
          />
          <Text>{item.name}</Text>
        </Div>
      </TouchableOpacity>
    );
  };
  return (
    <Container backgroundColor={colors.brown}>
      <Header isSearch textSearch={textSearch} onChangeSearch={onChangeSearch} />
      <Div margin={sizes.base * 2}>
        <Text semibold header>
          Danh Mục Sản Phẩm
        </Text>
      </Div>
      <Divider color={colors.black} />
      <Div>
        <FlatList
          //@ts-ignore
          data={data?.getCategories ?? []}
          keyExtractor={(item) => item.id}
          renderItem={renderItemCategory}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Div>
      <Div margin={sizes.base}>
        <Text semibold header>
          Sản Phẩm
        </Text>
      </Div>
      <Divider color={colors.black} />
      <Div margin={sizes.base} flex={1}>
        <FlatList
          //@ts-ignore
          data={dataProducts?.getProducts ?? []}
          keyExtractor={(item) => item.id}
          renderItem={renderItemProduct}
          bounces={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listProducts}
        />
      </Div>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageCategory: {
    width: sizes.base * 9,
    height: sizes.base * 9,
    resizeMode: 'contain',
    marginBottom: sizes.base,
  },
  imageProduct: {
    width: '100%',
    height: sizes.base * 20,
    resizeMode: 'contain',
    marginBottom: sizes.base * 2,
  },
  listProducts: {
    paddingBottom: DEFAULT_NAVBAR_HEIGHT + BOTTOM_SPACE,
  },
});
