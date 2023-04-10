import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigator/types';
import { DEVICE, SCREEN_NAME } from 'config/constants';
import { Container, Div, Text } from 'config/components';
import { colors, sizes } from 'config/theme';
import { navigationUtils } from 'config/utils';
import { Product } from 'graphql-hook';
const { PRODUCT_DETAIL, PRODUCT_BY_CATEGORY } = SCREEN_NAME;

export const ProductByCategory: React.FC<
  NativeStackScreenProps<RootStackParamList, typeof PRODUCT_BY_CATEGORY>
> = ({ route }) => {
  const { product } = route.params;
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
    <Container isBack isHeader title={product[0].category.name} backgroundColor={colors.brown}>
      <Div margin={[sizes.base * 2, sizes.base]} flex={1}>
        <FlatList
          data={product}
          keyExtractor={(item) => item.id}
          renderItem={renderItemProduct}
          bounces={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </Div>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageProduct: {
    width: '100%',
    height: sizes.base * 20,
    resizeMode: 'contain',
    marginBottom: sizes.base * 2,
  },
});
