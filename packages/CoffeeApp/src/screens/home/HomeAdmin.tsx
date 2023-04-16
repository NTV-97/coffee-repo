import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Container, Div, Text } from 'config/components';
import { RootStackParamList } from '@navigator/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BOTTOM_SPACE, DEFAULT_NAVBAR_HEIGHT, DEVICE, SCREEN_NAME } from 'config/constants';
import { colors, sizes } from 'config/theme';
import { useGetCategoriesQuery } from 'graphql-hook';
import { Category } from 'graphql-hook';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useGetProductsQuery } from 'graphql-hook';
import { navigationUtils } from 'config/utils';
import { useDeleteCategoryMutation } from 'graphql-hook';

const { HOME_ADMIN, UPDATE_CATEGORY, PRODUCT_BY_CATEGORY, CREATE_CATEGORY } = SCREEN_NAME;

export const HomeAdmin: React.FC<
  NativeStackScreenProps<RootStackParamList, typeof HOME_ADMIN>
> = () => {
  const { data, refetch } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation({
    onCompleted(_data) {
      if (_data) {
        refetch();
      }
    },
  });
  const onPressCategory = (idCategory: string) => {
    navigationUtils.navigate(PRODUCT_BY_CATEGORY, { idCategory });
  };

  const onPressUpdate = (idCategory: string) => {
    navigationUtils.navigate(UPDATE_CATEGORY, { idCategory });
  };
  const onPressCreate = () => {
    navigationUtils.navigate(CREATE_CATEGORY, { refetch });
  };
  const renderItemCategory = ({ item, index }: { item: Category; index: number }) => {
    return (
      <TouchableOpacity onPress={() => onPressCategory(item.id)}>
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
              <Text semibold header numberOfLines={3}>
                Mô tả: {item.description}
              </Text>
            </Div>
            <Div row flex={1}>
              <Div endSelf>
                <TouchableOpacity onPress={() => onPressUpdate(item.id)}>
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
              <Div mr={sizes.base} endSelf flex={1} alignRight>
                <TouchableOpacity onPress={() => deleteCategory({ variables: { id: item.id } })}>
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
      </TouchableOpacity>
    );
  };
  return (
    <Container backgroundColor={colors.brown}>
      <Div padding={sizes.base * 2}>
        <Text title bold black>
          Danh mục sản phẩm
        </Text>
      </Div>
      <Div padding={[sizes.base * 2, sizes.base * 2, 0]} flex={1}>
        <FlatList
          //@ts-ignore
          data={data?.getCategories ?? []}
          keyExtractor={(item) => item.id}
          renderItem={renderItemCategory}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      </Div>
      <Div mb={DEFAULT_NAVBAR_HEIGHT + BOTTOM_SPACE}>
        <Div margin={[0, sizes.base * 2, sizes.base * 2]}>
          <TouchableOpacity onPress={onPressCreate}>
            <Div blue padding={sizes.base * 2} radius={sizes.radius * 2} center middle>
              <Text bold header white>
                Thêm danh mục
              </Text>
            </Div>
          </TouchableOpacity>
        </Div>
      </Div>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  listProducts: {
    paddingBottom: DEFAULT_NAVBAR_HEIGHT + BOTTOM_SPACE,
  },
});
